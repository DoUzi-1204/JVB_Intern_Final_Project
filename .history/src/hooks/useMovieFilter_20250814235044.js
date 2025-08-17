import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API_CONFIG } from "../utils/constants";

// Constants
const ITEMS_PER_PAGE = 28;
const TMDB_ITEMS_PER_PAGE = 20;
const MAX_PAGES = 500;
const DEFAULT_SORT = "popularity.desc";
const VOTE_COUNT_THRESHOLD = 300;
const RELOAD_DELAY = 500;

// Helper function để parse URL parameters thành filters
const parseFiltersFromURL = (searchParams) => {
  const contentType = searchParams.get("type");
  const genres = searchParams.get("genres")?.split(",").filter(Boolean) || [];
  const countries = searchParams.get("countries")?.split(",").filter(Boolean) || [];
  const selectedYear = searchParams.get("year") ? parseInt(searchParams.get("year")) : null;
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
  const initialFilters = useMemo(() => parseFiltersFromURL(searchParams), [searchParams]);
  const [filters, setFilters] = useState(initialFilters);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [reloadMessage, setReloadMessage] = useState("Đang tải...");
  
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
  const maxReleaseDate = useMemo(() => `${currentYear}-12-31`, [currentYear]);

  // Optimized buildDiscoverURL với memoization và constants
  const buildDiscoverURL = useCallback(
    (contentType, page = 1) => {
      if (!API_KEY || !contentType) return null;

      const params = new URLSearchParams({
        api_key: API_KEY,
        language: "vi-VN",
        page: page.toString(),
        sort_by: filters.sortBy,
        include_adult: "false", // Default param
      });

      // Sử dụng memoized maxReleaseDate
      const maxReleaseDate = `${currentYear}-12-31`;
      const dateParam = contentType === "movie" ? "primary_release_date.lte" : "first_air_date.lte";
      params.append(dateParam, maxReleaseDate);

      // Tối ưu điểm TMDB filtering
      if (filters.sortBy === "vote_average.desc") {
        params.append("vote_count.gte", VOTE_COUNT_THRESHOLD.toString());
      }

      // Batch append filters để tối ưu performance
      if (filters.genres.length > 0) {
        params.append("with_genres", filters.genres.join(","));
      }

      if (filters.countries.length > 0) {
        params.append("with_origin_country", filters.countries.join("|"));
      }

      // Year filter optimization
      if (filters.selectedYear) {
        const yearParam = contentType === "movie" ? "primary_release_year" : "first_air_date_year";
        params.append(yearParam, filters.selectedYear.toString());
      }

      // Age ratings chỉ cho movie
      if (contentType === "movie" && filters.ageRatings.length > 0) {
        params.append("certification_country", "US");
        params.append("certification", filters.ageRatings.join("|"));
      }

      const url = `${API_CONFIG.BASE_URL}/discover/${contentType}?${params.toString()}`;
      console.log(`TMDB Discover URL: ${url}`);
      return url;
    },
    [API_KEY, filters, currentYear]
  );

  const fetchMovies = useCallback(
    async (page = 1) => {
      setLoading(true);

      try {
        let allResults = [];
        let maxTotalResults = 0;
        const contentTypes = filters.contentType
          ? [filters.contentType]
          : ["movie", "tv"];

        // Tính toán page range để lấy đủ 28 items
        const ITEMS_PER_PAGE = 28;
        const TMDB_ITEMS_PER_PAGE = 20;

        // Tính toán page range cần fetch từ TMDB
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        const startTmdbPage = Math.floor(startIndex / TMDB_ITEMS_PER_PAGE) + 1;
        const endTmdbPage = Math.ceil(endIndex / TMDB_ITEMS_PER_PAGE);

        // Fetch data for each content type
        for (const contentType of contentTypes) {
          const typeResults = [];

          for (
            let tmdbPage = startTmdbPage;
            tmdbPage <= endTmdbPage;
            tmdbPage++
          ) {
            const url = buildDiscoverURL(contentType, tmdbPage);
            if (!url) continue;

            const response = await fetch(url);
            const data = await response.json();

            if (data.results) {
              typeResults.push(...data.results);
              // Lấy total_results thực từ API để tính pagination
              maxTotalResults = Math.max(
                maxTotalResults,
                data.total_results || 0
              );
            }
          }

          // Add media_type to results
          const processedResults = typeResults.map((item) => ({
            ...item,
            media_type: contentType,
          }));

          allResults.push(...processedResults);
        }

        // Sort combined results
        allResults.sort((a, b) => {
          switch (filters.sortBy) {
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

        // Slice để lấy đúng 28 items cho trang hiện tại
        const pageResults = allResults.slice(
          startIndex %
            (TMDB_ITEMS_PER_PAGE * (endTmdbPage - startTmdbPage + 1)),
          (startIndex %
            (TMDB_ITEMS_PER_PAGE * (endTmdbPage - startTmdbPage + 1))) +
            ITEMS_PER_PAGE
        );

        setMovies(pageResults);
        setTotalResults(maxTotalResults);

        // Tính total pages dựa trên 28 items per page
        const calculatedTotalPages = Math.ceil(
          maxTotalResults / ITEMS_PER_PAGE
        );
        setTotalPages(Math.min(500, calculatedTotalPages)); // TMDB giới hạn 500 pages
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    },
    [buildDiscoverURL, filters]
  );

  const handlePageChange = useCallback(
    (page) => {
      // Set loading state before reload
      setIsReloading(true);
      setReloadMessage(`Đang chuyển đến trang ${page}...`);

      // Tạo URL mới với page parameter
      const params = new URLSearchParams(searchParams);
      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }

      // Navigate với parameters mới
      const newUrl = params.toString()
        ? `/filter?${params.toString()}`
        : "/filter";
      navigate(newUrl, { replace: true });

      // Scroll to top before reload
      window.scrollTo(0, 0);

      // Add small delay to show loading state before reload
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    [searchParams, navigate, setIsReloading, setReloadMessage]
  );

  // Hàm cập nhật URL parameters từ filters
  // Hàm cập nhật filters mà không tự động fetch
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Hàm áp dụng bộ lọc - reload trang với URL parameters mới
  const applyFilters = useCallback(() => {
    // Set loading state before reload
    setIsReloading(true);
    setReloadMessage("Đang áp dụng bộ lọc...");

    // Tạo URL parameters từ filters hiện tại
    const params = new URLSearchParams();

    if (filters.contentType) {
      params.set("type", filters.contentType);
    }

    if (filters.genres && filters.genres.length > 0) {
      params.set("genres", filters.genres.join(","));
    }

    if (filters.countries && filters.countries.length > 0) {
      params.set("countries", filters.countries.join(","));
    }

    if (filters.selectedYear) {
      params.set("year", filters.selectedYear.toString());
    }

    if (filters.ageRatings && filters.ageRatings.length > 0) {
      params.set("age", filters.ageRatings.join(","));
    }

    if (filters.sortBy && filters.sortBy !== "popularity.desc") {
      params.set("sort", filters.sortBy);
    }

    // Navigate to the same route with new parameters, which will reload the page
    const newUrl = params.toString()
      ? `/filter?${params.toString()}`
      : "/filter";
    navigate(newUrl, { replace: true });

    // Scroll to top before reload
    window.scrollTo(0, 0);

    // Add small delay to show loading state before reload
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }, [filters, navigate, setIsReloading, setReloadMessage]);

  const clearFilters = useCallback(() => {
    // Set loading state before reload
    setIsReloading(true);
    setReloadMessage("Đang xóa bộ lọc...");

    // Navigate to filter page without any parameters
    navigate("/filter", { replace: true });

    // Scroll to top before reload
    window.scrollTo(0, 0);

    // Add small delay to show loading state before reload
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }, [navigate, setIsReloading]); // Tự động fetch dữ liệu khi component mount hoặc khi URL thay đổi
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      // Scroll to top when page loads
      window.scrollTo(0, 0);

      // Nếu có parameters trong URL, fetch với currentPage, ngược lại fetch page 1
      const hasParams = searchParams.toString();
      if (hasParams) {
        fetchMovies(currentPage);
      } else {
        fetchMovies(1);
      }
    }
  }, [fetchMovies, isInitialized, currentPage, searchParams]);

  // Theo dõi thay đổi URL parameters và cập nhật filters
  useEffect(() => {
    if (isInitialized) {
      const newFilters = parseFiltersFromURL(searchParams);
      setFilters(newFilters);

      const page = searchParams.get("page");
      const newPage = page ? parseInt(page) : 1;
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    }
  }, [searchParams, isInitialized, currentPage]);

  // Xóa useEffect tự động fetch khi filters thay đổi
  // useEffect(() => {
  //   fetchMovies(1);
  // }, [fetchMovies]);

  return {
    filters,
    movies,
    loading,
    isReloading,
    reloadMessage,
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
