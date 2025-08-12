import { useState, useEffect, useCallback } from "react";
import { API_CONFIG } from "../utils/constants";

const useMovieFilter = () => {
  const [filters, setFilters] = useState({
    contentType: null, // "movie", "tv", hoặc null (tất cả)
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
  const [itemsPerPage] = useState(28); // 28 phim mỗi trang

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

      // Add genre filter
      if (filters.genres.length > 0) {
        params.append("with_genres", filters.genres.join(","));
      }

      // Add country filter
      if (filters.countries.length > 0) {
        params.append("with_origin_country", filters.countries.join("|"));
      }

      // Add year filter
      if (filters.selectedYear) {
        if (contentType === "movie") {
          params.append("primary_release_year", filters.selectedYear.toString());
        } else {
          params.append("first_air_date_year", filters.selectedYear.toString());
        }
      }

      // Add certification filter (age ratings) - chỉ áp dụng cho movie
      if (contentType === "movie" && filters.ageRatings.length > 0) {
        params.append("certification_country", "US");
        params.append("certification", filters.ageRatings.join("|"));
      }

      return `${API_CONFIG.BASE_URL}/discover/${contentType}?${params.toString()}`;
    },
    [API_KEY, filters]
  );

  // Fetch movies for specific page with lazy loading
  const fetchMoviesForPage = useCallback(
    async (targetPage = 1) => {
      setLoading(true);
      try {
        let allResults = [];
        let maxTotalResults = 0;
        
        const contentTypes = filters.contentType
          ? [filters.contentType]
          : ["movie", "tv"];

        // Calculate which TMDB pages we need to fetch
        const startIndex = (targetPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        // Each TMDB page has 20 items, so calculate page range needed
        const startTMDbPage = Math.floor(startIndex / 20) + 1;
        const endTMDbPage = Math.floor(endIndex / 20) + 1;

        for (const contentType of contentTypes) {
          let typeResults = [];
          let typeTotalResults = 0;

          // Fetch required TMDB pages
          for (let tmdbPage = startTMDbPage; tmdbPage <= endTMDbPage; tmdbPage++) {
            const url = buildDiscoverURL(contentType, tmdbPage);
            if (!url) continue;

            const response = await fetch(url);
            const data = await response.json();

            if (data.results) {
              typeResults.push(...data.results);
              typeTotalResults = data.total_results || 0;
            }
          }

          // Add media_type to results
          const processedResults = typeResults.map((item) => ({
            ...item,
            media_type: contentType,
          }));

          allResults.push(...processedResults);
          maxTotalResults = Math.max(maxTotalResults, typeTotalResults);
        }

        // Sort combined results
        allResults.sort((a, b) => {
          switch (filters.sortBy) {
            case "popularity.desc":
              return (b.popularity || 0) - (a.popularity || 0);
            case "popularity.asc":
              return (a.popularity || 0) - (b.popularity || 0);
            case "vote_average.desc":
              return (b.vote_average || 0) - (a.vote_average || 0);
            case "vote_average.asc":
              return (a.vote_average || 0) - (b.vote_average || 0);
            case "release_date.desc":
              const dateA = new Date(a.release_date || a.first_air_date || 0);
              const dateB = new Date(b.release_date || b.first_air_date || 0);
              return dateB - dateA;
            case "release_date.asc":
              const dateA2 = new Date(a.release_date || a.first_air_date || 0);
              const dateB2 = new Date(b.release_date || b.first_air_date || 0);
              return dateA2 - dateB2;
            default:
              return (b.popularity || 0) - (a.popularity || 0);
          }
        });

        // Extract 28 items for current page
        const pageStartIndex = startIndex % (allResults.length);
        const pageItems = allResults.slice(pageStartIndex, pageStartIndex + itemsPerPage);

        // Calculate total pages based on 28 items per page
        const calculatedTotalPages = Math.ceil(maxTotalResults / itemsPerPage);

        setMovies(pageItems);
        setCurrentPage(targetPage);
        setTotalPages(calculatedTotalPages);
        setTotalResults(maxTotalResults);

      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
        setTotalPages(0);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    [buildDiscoverURL, itemsPerPage, filters.sortBy]
  );

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      fetchMoviesForPage(page);
    }
  }, [fetchMoviesForPage, totalPages]);

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

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

  // Fetch movies when filters change or component mounts
  useEffect(() => {
    fetchMoviesForPage(1);
  }, [fetchMoviesForPage]);

  return {
    filters,
    movies,
    loading,
    currentPage,
    totalPages,
    totalResults,
    itemsPerPage,
    applyFilters,
    clearFilters,
    handlePageChange,
  };
};

export default useMovieFilter;
