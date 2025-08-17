import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API_CONFIG } from "../utils/constants";

// Constants
const ITEMS_PER_PAGE = 28;
const TMDB_ITEMS_PER_PAGE = 20;
const MAX_PAGES = 500;
const DEFAULT_SORT = "popularity.desc";
const VOTE_COUNT_THRESHOLD = 300;

// Helper function để parse URL parameters thành filters
const parseFiltersFromURL = (searchParams) => {
  const contentType = searchParams.get("type");
  const genres = searchParams.get("genres")?.split(",").filter(Boolean) || [];
  const countries =
    searchParams.get("countries")?.split(",").filter(Boolean) || [];
  const selectedYear = searchParams.get("year")
    ? parseInt(searchParams.get("year"))
    : null;
  const ageRatings = searchParams.get("age")?.split(",").filter(Boolean) || [];
  const sortBy = searchParams.get("sort") || DEFAULT_SORT;

  return {
    contentType,
    genres,
    countries,
    selectedYear,
    ageRatings,
    sortBy,
  };
};

const useMovieFilter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Memoize API_KEY to avoid unnecessary re-renders
  const API_KEY = useMemo(() => import.meta.env.VITE_API_KEY, []);

  // Khởi tạo filters từ URL parameters với memoization
  const initialFilters = useMemo(
    () => parseFiltersFromURL(searchParams),
    [searchParams]
  );
  const [filters, setFilters] = useState(initialFilters);

  const [movies, setMovies] = useState([]);

  // Chỉ dùng một loading state duy nhất với message động
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Đang tải...");

  // Memoize initial page calculation
  const initialPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) : 1;
  }, [searchParams]);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoize current year to avoid recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Optimized buildDiscoverURL với memoization và constants
  const buildDiscoverURL = useCallback(
    (contentType, page = 1) => {
      if (!API_KEY || !contentType) return null;

      const params = new URLSearchParams({
        api_key: API_KEY,
        language: "vi-VN",
        page: page.toString(),
        sort_by: filters.sortBy,
        include_adult: "false",
      });

      const maxReleaseDate = `${currentYear}-12-31`;
      const dateParam =
        contentType === "movie"
          ? "primary_release_date.lte"
          : "first_air_date.lte";
      params.append(dateParam, maxReleaseDate);

      if (filters.sortBy === "vote_average.desc") {
        params.append("vote_count.gte", VOTE_COUNT_THRESHOLD.toString());
      }

      if (filters.genres.length > 0) {
        params.append("with_genres", filters.genres.join(","));
      }

      if (filters.countries.length > 0) {
        params.append("with_origin_country", filters.countries.join("|"));
      }

      if (filters.selectedYear) {
        const yearParam =
          contentType === "movie"
            ? "primary_release_year"
            : "first_air_date_year";
        params.append(yearParam, filters.selectedYear.toString());
      }

      if (contentType === "movie" && filters.ageRatings.length > 0) {
        params.append("certification_country", "US");
        params.append("certification", filters.ageRatings.join("|"));
      }

      const url = `${
        API_CONFIG.BASE_URL
      }/discover/${contentType}?${params.toString()}`;
      console.log(`TMDB Discover URL: ${url}`);
      return url;
    },
    [API_KEY, filters, currentYear]
  );

  const sortResults = useCallback((results, sortBy) => {
    return [...results].sort((a, b) => {
      switch (sortBy) {
        case "popularity.desc":
          return (b.popularity || 0) - (a.popularity || 0);
        case "vote_average.desc":
          return (b.vote_average || 0) - (a.vote_average || 0);
        case "release_date.desc": {
          const dateA = new Date(a.release_date || a.first_air_date || 0);
          const dateB = new Date(b.release_date || b.first_air_date || 0);
          return dateB - dateA;
        }
        case "revenue.desc":
          return (b.revenue || 0) - (a.revenue || 0);
        case "title.asc": {
          const titleA = (a.title || a.name || "").toLowerCase();
          const titleB = (b.title || b.name || "").toLowerCase();
          return titleA.localeCompare(titleB);
        }
        default:
          return (b.popularity || 0) - (a.popularity || 0);
      }
    });
  }, []);

  // Optimize fetchMovies với unified loading state
  const fetchMovies = useCallback(
    async (page = 1, message = "Đang tải...") => {
      setLoading(true);
      setLoadingMessage(message);

      try {
        const allResults = [];
        let maxTotalResults = 0;
        const contentTypes = filters.contentType
          ? [filters.contentType]
          : ["movie", "tv"];

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const startTmdbPage = Math.floor(startIndex / TMDB_ITEMS_PER_PAGE) + 1;
        const endTmdbPage = Math.ceil(endIndex / TMDB_ITEMS_PER_PAGE);

        const fetchPromises = [];

        for (const contentType of contentTypes) {
          for (
            let tmdbPage = startTmdbPage;
            tmdbPage <= endTmdbPage;
            tmdbPage++
          ) {
            const url = buildDiscoverURL(contentType, tmdbPage);
            if (url) {
              fetchPromises.push(
                fetch(url)
                  .then((response) => response.json())
                  .then((data) => ({ ...data, contentType }))
                  .catch((error) => {
                    console.error(
                      `Error fetching ${contentType} page ${tmdbPage}:`,
                      error
                    );
                    return { results: [], contentType };
                  })
              );
            }
          }
        }

        const responses = await Promise.all(fetchPromises);

        responses.forEach((data) => {
          if (data.results?.length > 0) {
            const processedResults = data.results.map((item) => ({
              ...item,
              media_type: data.contentType,
            }));
            allResults.push(...processedResults);
            maxTotalResults = Math.max(
              maxTotalResults,
              data.total_results || 0
            );
          }
        });

        const sortedResults = sortResults(allResults, filters.sortBy);
        const pageResults = sortedResults.slice(
          startIndex %
            (TMDB_ITEMS_PER_PAGE * (endTmdbPage - startTmdbPage + 1)),
          (startIndex %
            (TMDB_ITEMS_PER_PAGE * (endTmdbPage - startTmdbPage + 1))) +
            ITEMS_PER_PAGE
        );

        setMovies(pageResults);
        setTotalResults(maxTotalResults);
        setTotalPages(
          Math.min(MAX_PAGES, Math.ceil(maxTotalResults / ITEMS_PER_PAGE))
        );
      } catch (error) {
        console.error("Error fetching content:", error);
        setMovies([]);
        setTotalResults(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    },
    [buildDiscoverURL, filters.contentType, filters.sortBy, sortResults]
  );

  // Tối ưu navigation - không dùng reload, chỉ navigate và fetch
  const handlePageChange = useCallback(
    (page) => {
      const params = new URLSearchParams(searchParams);
      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }

      const newUrl = params.toString()
        ? `/filter?${params.toString()}`
        : "/filter";

      navigate(newUrl, { replace: true });
      window.scrollTo(0, 0);

      // Fetch với message phù hợp
      fetchMovies(page, `Đang chuyển đến trang ${page}...`);
    },
    [searchParams, navigate, fetchMovies]
  );

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    const paramMap = {
      type: filters.contentType,
      genres: filters.genres?.length > 0 ? filters.genres.join(",") : null,
      countries:
        filters.countries?.length > 0 ? filters.countries.join(",") : null,
      year: filters.selectedYear?.toString(),
      age: filters.ageRatings?.length > 0 ? filters.ageRatings.join(",") : null,
      sort: filters.sortBy !== DEFAULT_SORT ? filters.sortBy : null,
    };

    Object.entries(paramMap).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const newUrl = params.toString()
      ? `/filter?${params.toString()}`
      : "/filter";

    navigate(newUrl, { replace: true });
    window.scrollTo(0, 0);

    // Fetch với message áp dụng filter
    fetchMovies(1, "Đang áp dụng bộ lọc...");
  }, [filters, navigate, fetchMovies]);

  const clearFilters = useCallback(() => {
    navigate("/filter", { replace: true });
    window.scrollTo(0, 0);

    // Fetch với message xóa filter
    fetchMovies(1, "Đang xóa bộ lọc...");
  }, [navigate, fetchMovies]);

  // Optimize useEffect với better dependency management
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      window.scrollTo(0, 0);

      const hasParams = searchParams.toString();
      fetchMovies(hasParams ? currentPage : 1, "Đang tải...");
    }
  }, [fetchMovies, isInitialized, currentPage, searchParams]);

  // Optimize URL parameter tracking - chỉ update state, không fetch lại
  useEffect(() => {
    if (isInitialized) {
      const newFilters = parseFiltersFromURL(searchParams);
      const newPage = parseInt(searchParams.get("page")) || 1;

      setFilters(newFilters);
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    }
  }, [searchParams, isInitialized, currentPage]);

  return {
    filters,
    movies,
    loading, // Chỉ return một loading state
    loadingMessage, // Return message thay vì isReloading và reloadMessage
    currentPage,
    totalPages,
    totalResults,
    updateFilters,
    applyFilters,
    clearFilters,
    handlePageChange,
  };
};

export default useMovieFilter;
