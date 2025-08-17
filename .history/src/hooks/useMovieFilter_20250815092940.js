import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_CONFIG } from "../utils/constants";

const useMovieFilter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    contentType: null,
    genres: [],
    countries: [],
    selectedYear: null,
    ageRatings: [],
    sortBy: "popularity.desc",
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const buildDiscoverURL = useCallback(
    (contentType, page = 1) => {
      if (!API_KEY || !contentType) return null;

      const params = new URLSearchParams({
        api_key: API_KEY,
        language: "vi-VN",
        page: page.toString(),
        sort_by: filters.sortBy,
      });

      params.append("include_adult", "false");

      const currentYear = new Date().getFullYear();
      const maxReleaseDate = `${currentYear}-12-31`;

      if (contentType === "movie") {
        params.append("primary_release_date.lte", maxReleaseDate);
      } else {
        params.append("first_air_date.lte", maxReleaseDate);
      }

      if (filters.sortBy === "vote_average.desc") {
        params.append("vote_count.gte", "300");
      }

      if (filters.genres.length > 0) {
        params.append("with_genres", filters.genres.join(","));
      }
      if (filters.countries.length > 0) {
        params.append("with_origin_country", filters.countries.join("|"));
      }
      if (filters.selectedYear) {
        if (contentType === "movie") {
          params.append(
            "primary_release_year",
            filters.selectedYear.toString()
          );
        } else {
          params.append("first_air_date_year", filters.selectedYear.toString());
        }
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
    [API_KEY, filters]
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

        const ITEMS_PER_PAGE = 28;
        const TMDB_ITEMS_PER_PAGE = 20;

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        const startTmdbPage = Math.floor(startIndex / TMDB_ITEMS_PER_PAGE) + 1;
        const endTmdbPage = Math.ceil(endIndex / TMDB_ITEMS_PER_PAGE);

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
              maxTotalResults = Math.max(
                maxTotalResults,
                data.total_results || 0
              );
            }
          }

          const processedResults = typeResults.map((item) => ({
            ...item,
            media_type: contentType,
          }));

          allResults.push(...processedResults);
        }

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

        const pageResults = allResults.slice(
          startIndex %
            (TMDB_ITEMS_PER_PAGE * (endTmdbPage - startTmdbPage + 1)),
          (startIndex %
            (TMDB_ITEMS_PER_PAGE * (endTmdbPage - startTmdbPage + 1))) +
            ITEMS_PER_PAGE
        );

        setMovies(pageResults);
        setTotalResults(maxTotalResults);

        const calculatedTotalPages = Math.ceil(
          maxTotalResults / ITEMS_PER_PAGE
        );
        setTotalPages(Math.min(500, calculatedTotalPages));
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    },
    [buildDiscoverURL, filters]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.contentType) params.set("type", filters.contentType);
    if (filters.genres.length > 0)
      params.set("genres", filters.genres.join(","));
    if (filters.countries.length > 0)
      params.set("countries", filters.countries.join(","));
    if (filters.selectedYear) params.set("year", filters.selectedYear);
    if (filters.ageRatings.length > 0)
      params.set("age", filters.ageRatings.join(","));
    if (filters.sortBy && filters.sortBy !== "popularity.desc")
      params.set("sort", filters.sortBy);
    params.set("page", "1");
    navigate(`/filter?${params.toString()}`);
  }, [filters, navigate]);

  const clearFilters = useCallback(() => {
    const defaultFilters = {
      contentType: null,
      genres: [],
      countries: [],
      selectedYear: null,
      ageRatings: [],
      sortBy: "popularity.desc",
    };
    setFilters(defaultFilters);
    setCurrentPage(1);
  }, []);

  // Đồng bộ từ URL vào state, không fetch ở đây
  useEffect(() => {
    const newFilters = {
      contentType: searchParams.get("type"),
      genres: searchParams.get("genres")?.split(",").filter(Boolean) || [],
      countries:
        searchParams.get("countries")?.split(",").filter(Boolean) || [],
      selectedYear: searchParams.get("year")
        ? parseInt(searchParams.get("year"))
        : null,
      ageRatings: searchParams.get("age")?.split(",").filter(Boolean) || [],
      sortBy: searchParams.get("sort") || "popularity.desc",
    };
    setFilters(newFilters);
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page"))
      : 1;
    setCurrentPage(page);
  }, [searchParams]);

  // Chỉ fetch khi filters hoặc currentPage thay đổi
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
    fetchMovies(currentPage);
  }, [filters, currentPage, fetchMovies, isInitialized]);

  return {
    filters,
    movies,
    loading,
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
