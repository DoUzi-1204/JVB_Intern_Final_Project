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
  
  // Buffer để lưu trữ items dư từ API calls
  const [movieBuffer, setMovieBuffer] = useState([]);
  const [currentBufferPage, setCurrentBufferPage] = useState(1);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const ITEMS_PER_PAGE = 28; // 7x4 grid

  const buildDiscoverURL = useCallback(
    (contentType, page = 1) => {
      if (!API_KEY || !contentType) return null;

      const baseURL = contentType === "movie" 
        ? `${API_CONFIG.BASE_URL}/discover/movie`
        : `${API_CONFIG.BASE_URL}/discover/tv`;

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
          params.append("primary_release_date.gte", `${filters.selectedYear}-01-01`);
          params.append("primary_release_date.lte", `${filters.selectedYear}-12-31`);
        } else {
          params.append("first_air_date.gte", `${filters.selectedYear}-01-01`);
          params.append("first_air_date.lte", `${filters.selectedYear}-12-31`);
        }
      }

      // Add age ratings (only for movies)
      if (contentType === "movie" && filters.ageRatings.length > 0) {
        params.append("certification_country", "US");
        params.append("certification", filters.ageRatings.join("|"));
      }

      return `${baseURL}?${params.toString()}`;
    },
    [API_KEY, filters]
  );

  const fetchAndBufferContent = useCallback(
    async (apiPage = 1) => {
      if (!API_KEY) return { items: [], totalPages: 0, totalResults: 0 };

      setLoading(true);
      try {
        if (filters.contentType) {
          // Fetch single content type
          const url = buildDiscoverURL(filters.contentType, apiPage);
          const response = await fetch(url);
          const data = await response.json();

          const processedItems = data.results.map((item) => ({
            ...item,
            media_type: filters.contentType,
          }));

          return {
            items: processedItems,
            totalPages: Math.min(data.total_pages || 0, 500),
            totalResults: data.total_results || 0,
          };
        } else {
          // Fetch both movie and TV
          const [movieResponse, tvResponse] = await Promise.all([
            fetch(buildDiscoverURL("movie", apiPage)),
            fetch(buildDiscoverURL("tv", apiPage)),
          ]);

          const [movieData, tvData] = await Promise.all([
            movieResponse.json(),
            tvResponse.json(),
          ]);

          const allItems = [
            ...movieData.results.map((item) => ({ ...item, media_type: "movie" })),
            ...tvData.results.map((item) => ({ ...item, media_type: "tv" })),
          ];

          // Sort combined results
          const sortedItems = allItems.sort((a, b) => {
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

          // Calculate total pages based on combined results
          const totalCombinedResults = (movieData.total_results || 0) + (tvData.total_results || 0);
          const maxApiPages = Math.min(
            Math.max(movieData.total_pages || 0, tvData.total_pages || 0),
            500
          );

          return {
            items: sortedItems,
            totalPages: maxApiPages,
            totalResults: totalCombinedResults,
          };
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        return { items: [], totalPages: 0, totalResults: 0 };
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, buildDiscoverURL, filters]
  );

  const loadMoreToBuffer = useCallback(async () => {
    const nextApiPage = Math.ceil(movieBuffer.length / 40) + 1; // 40 items per API call
    const result = await fetchAndBufferContent(nextApiPage);
    
    setMovieBuffer(prev => [...prev, ...result.items]);
    setTotalPages(Math.ceil((movieBuffer.length + result.items.length) / ITEMS_PER_PAGE));
    setTotalResults(result.totalResults);
  }, [fetchAndBufferContent, movieBuffer.length]);

  const getPageItems = useCallback((page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return movieBuffer.slice(startIndex, endIndex);
  }, [movieBuffer]);

  const handlePageChange = useCallback(async (page) => {
    const requiredItems = page * ITEMS_PER_PAGE;
    
    // Nếu buffer không đủ items cho trang được yêu cầu, fetch thêm
    if (movieBuffer.length < requiredItems) {
      await loadMoreToBuffer();
    }
    
    setCurrentPage(page);
    setMovies(getPageItems(page));
  }, [movieBuffer.length, loadMoreToBuffer, getPageItems]);

  const applyFilters = useCallback(async (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setCurrentBufferPage(1);
    
    // Reset buffer và fetch trang đầu
    setMovieBuffer([]);
    const result = await fetchAndBufferContent(1);
    
    setMovieBuffer(result.items);
    setTotalPages(Math.ceil(result.items.length / ITEMS_PER_PAGE));
    setTotalResults(result.totalResults);
    setMovies(result.items.slice(0, ITEMS_PER_PAGE));
  }, [fetchAndBufferContent]);

  const clearFilters = useCallback(async () => {
    const defaultFilters = {
      contentType: null,
      genres: [],
      countries: [],
      selectedYear: null,
      ageRatings: [],
      sortBy: "popularity.desc",
    };
    
    await applyFilters(defaultFilters);
  }, [applyFilters]);

  // Initial load
  useEffect(() => {
    const initialLoad = async () => {
      const result = await fetchAndBufferContent(1);
      setMovieBuffer(result.items);
      setTotalPages(Math.ceil(result.items.length / ITEMS_PER_PAGE));
      setTotalResults(result.totalResults);
      setMovies(result.items.slice(0, ITEMS_PER_PAGE));
    };

    initialLoad();
  }, []); // Chỉ chạy một lần khi component mount

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
