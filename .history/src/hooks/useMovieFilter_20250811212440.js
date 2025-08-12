import { useState, useEffect, useCallback } from "react";
import { API_CONFIG } from "../utils/constants";

const useMovieFilter = () => {
  const [filters, setFilters] = useState({
    contentType: null, // "movie", "tv", hoặc null (tất cả)
    genres: [],
    countries: [],
    yearRange: { min: null, max: null },
    ageRatings: [],
    sortBy: "popularity.desc",
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

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

      // Add year range filter (different for movie vs TV)
      if (filters.yearRange.min) {
        const dateParam = contentType === "movie" ? "primary_release_date.gte" : "first_air_date.gte";
        params.append(dateParam, `${filters.yearRange.min}-01-01`);
      }
      if (filters.yearRange.max) {
        const dateParam = contentType === "movie" ? "primary_release_date.lte" : "first_air_date.lte";
        params.append(dateParam, `${filters.yearRange.max}-12-31`);
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

  const fetchMovies = useCallback(
    async (page = 1) => {
      const url = buildDiscoverURL(page);
      if (!url) return;

      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
          // Fetch multiple pages to get enough movies for pagination
          const allResults = [...data.results];
          const totalPagesToFetch = Math.min(10, data.total_pages); // Fetch up to 10 pages

          // Fetch additional pages if needed
          const promises = [];
          for (let i = 2; i <= totalPagesToFetch; i++) {
            const pageUrl = buildDiscoverURL(i);
            promises.push(fetch(pageUrl).then((res) => res.json()));
          }

          if (promises.length > 0) {
            const additionalData = await Promise.all(promises);
            additionalData.forEach((pageData) => {
              if (pageData.results) {
                allResults.push(...pageData.results);
              }
            });
          }

          const processedMovies = allResults.map((movie) => ({
            ...movie,
            media_type: "movie",
          }));

          setMovies(processedMovies);
          setTotalResults(data.total_results);

          // Calculate pagination based on 28 movies per page
          const moviesPerPage = 28;
          const calculatedTotalPages = Math.ceil(
            processedMovies.length / moviesPerPage
          );
          setTotalPages(calculatedTotalPages);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    },
    [buildDiscoverURL]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setMovies([]);
    setTotalPages(0);
    setTotalResults(0);
  }, []);

  const clearFilters = useCallback(() => {
    const defaultFilters = {
      genres: [],
      countries: [],
      yearRange: { min: null, max: null },
      ageRatings: [],
      sortBy: "popularity.desc",
    };
    setFilters(defaultFilters);
    setCurrentPage(1);
    setMovies([]);
    setTotalPages(0);
    setTotalResults(0);
  }, []);

  // Fetch movies when filters change
  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  return {
    filters,
    movies,
    loading,
    currentPage,
    totalPages,
    totalResults,
    applyFilters,
    clearFilters,
    handlePageChange,
  };
};

export default useMovieFilter;
