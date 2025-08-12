import { useState, useEffect, useCallback } from "react";
import { API_CONFIG } from "../utils/constants";

const useMovieFilter = () => {
  const [filters, setFilters] = useState({
    genres: [],
    countries: [],
    yearRange: { min: null, max: null },
    ageRatings: [],
    sortBy: "popularity.desc",
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const buildDiscoverURL = useCallback(
    (page = 1) => {
      if (!API_KEY) return null;

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

      // Add year range filter
      if (filters.yearRange.min) {
        params.append(
          "primary_release_date.gte",
          `${filters.yearRange.min}-01-01`
        );
      }
      if (filters.yearRange.max) {
        params.append(
          "primary_release_date.lte",
          `${filters.yearRange.max}-12-31`
        );
      }

      // Add certification filter (age ratings)
      if (filters.ageRatings.length > 0) {
        params.append("certification_country", "US");
        params.append("certification", filters.ageRatings.join("|"));
      }

      return `${API_CONFIG.BASE_URL}/discover/movie?${params.toString()}`;
    },
    [API_KEY, filters]
  );

  const fetchMovies = useCallback(
    async (page = 1, appendToExisting = false) => {
      const url = buildDiscoverURL(page);
      if (!url) return;

      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
          const newMovies = data.results.map((movie) => ({
            ...movie,
            media_type: "movie",
          }));

          if (appendToExisting) {
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
          } else {
            setMovies(newMovies);
          }

          setCurrentPage(data.page);
          setHasMore(data.page < data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    },
    [buildDiscoverURL]
  );

  const loadMoreMovies = useCallback(async () => {
    if (hasMore && !loading) {
      await fetchMovies(currentPage + 1, true);
    }
  }, [fetchMovies, hasMore, loading, currentPage]);

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setMovies([]);
    setHasMore(true);
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
    setHasMore(true);
  }, []);

  // Fetch movies when filters change
  useEffect(() => {
    fetchMovies(1, false);
  }, [fetchMovies]);

  return {
    filters,
    movies,
    loading,
    hasMore,
    applyFilters,
    clearFilters,
    loadMoreMovies,
    totalResults: movies.length,
  };
};

export default useMovieFilter;
