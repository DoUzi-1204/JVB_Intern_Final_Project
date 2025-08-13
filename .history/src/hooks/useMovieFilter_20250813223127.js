import { useState, useCallback, useEffect } from "react";
import { API_CONFIG } from "../utils/constants";

// Constants
const ITEMS_PER_PAGE = 28;
const TMDB_ITEMS_PER_PAGE = 20;
const MAX_PAGES = 500; // TMDB limit
const CURRENT_YEAR = new Date().getFullYear();
const MAX_RELEASE_DATE = `${CURRENT_YEAR}-12-31`;

// Default filters
const DEFAULT_FILTERS = {
  contentType: null, // Mặc định hiển thị tất cả (movie + tv)
  genres: [],
  countries: [],
  selectedYear: null,
  ageRatings: [],
  sortBy: "popularity.desc",
};

// Sort functions
const sortFunctions = {
  "popularity.desc": (a, b) => (b.popularity || 0) - (a.popularity || 0),
  "vote_average.desc": (a, b) => (b.vote_average || 0) - (a.vote_average || 0),
  "release_date.desc": (a, b) => {
    const dateA = new Date(a.release_date || a.first_air_date || 0);
    const dateB = new Date(b.release_date || b.first_air_date || 0);
    return dateB - dateA;
  },
  "revenue.desc": (a, b) => (b.revenue || 0) - (a.revenue || 0),
  "title.asc": (a, b) => {
    const titleA = (a.title || a.name || "").toLowerCase();
    const titleB = (b.title || b.name || "").toLowerCase();
    return titleA.localeCompare(titleB);
  },
};

const useMovieFilter = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Helper function to build URL parameters
  const buildUrlParams = useCallback((contentType, page) => {
    const params = new URLSearchParams({
      api_key: API_KEY,
      language: "vi-VN",
      page: page.toString(),
      sort_by: filters.sortBy,
      include_adult: "false",
    });

    // Add release date limits
    if (contentType === "movie") {
      params.append("primary_release_date.lte", MAX_RELEASE_DATE);
    } else {
      params.append("first_air_date.lte", MAX_RELEASE_DATE);
    }

    // Add vote count for rating sort
    if (filters.sortBy === "vote_average.desc") {
      params.append("vote_count.gte", "300");
    }

    // Add filters
    if (filters.genres.length > 0) {
      params.append("with_genres", filters.genres.join(","));
    }

    if (filters.countries.length > 0) {
      params.append("with_origin_country", filters.countries.join("|"));
    }

    if (filters.selectedYear) {
      const yearParam = contentType === "movie" ? "primary_release_year" : "first_air_date_year";
      params.append(yearParam, filters.selectedYear.toString());
    }

    // Age ratings only for movies
    if (contentType === "movie" && filters.ageRatings.length > 0) {
      params.append("certification_country", "US");
      params.append("certification", filters.ageRatings.join("|"));
    }

    return params;
  }, [API_KEY, filters]);

  const buildDiscoverURL = useCallback(
    (contentType, page = 1) => {
      if (!API_KEY || !contentType) return null;

      const params = buildUrlParams(contentType, page);
      const url = `${API_CONFIG.BASE_URL}/discover/${contentType}?${params.toString()}`;
      
      console.log(`TMDB Discover URL: ${url}`);
      return url;
    },
    [API_KEY, buildUrlParams]
  );

  // Helper function to calculate pagination
  const calculatePagination = useCallback((page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const startTmdbPage = Math.floor(startIndex / TMDB_ITEMS_PER_PAGE) + 1;
    const endTmdbPage = Math.ceil(endIndex / TMDB_ITEMS_PER_PAGE);

    return { startIndex, endIndex, startTmdbPage, endTmdbPage };
  }, []);

  // Helper function to fetch single content type
  const fetchContentType = useCallback(async (contentType, startTmdbPage, endTmdbPage) => {
    const typeResults = [];
    let maxTotalResults = 0;

    for (let tmdbPage = startTmdbPage; tmdbPage <= endTmdbPage; tmdbPage++) {
      const url = buildDiscoverURL(contentType, tmdbPage);
      if (!url) continue;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results) {
          typeResults.push(...data.results);
          maxTotalResults = Math.max(maxTotalResults, data.total_results || 0);
        }
      } catch (error) {
        console.error(`Error fetching ${contentType} page ${tmdbPage}:`, error);
      }
    }

    // Add media_type to results
    return {
      results: typeResults.map((item) => ({ ...item, media_type: contentType })),
      totalResults: maxTotalResults,
    };
  }, [buildDiscoverURL]);

  const fetchMovies = useCallback(
    async (page = 1) => {
      if (loading) return; // Prevent duplicate requests
      
      setLoading(true);

      try {
        const contentTypes = filters.contentType ? [filters.contentType] : ["movie", "tv"];
        const { startIndex, startTmdbPage, endTmdbPage } = calculatePagination(page);

        let allResults = [];
        let maxTotalResults = 0;

        // Fetch all content types in parallel
        const fetchPromises = contentTypes.map(contentType =>
          fetchContentType(contentType, startTmdbPage, endTmdbPage)
        );

        const results = await Promise.all(fetchPromises);

        // Combine results
        results.forEach(({ results: typeResults, totalResults }) => {
          allResults.push(...typeResults);
          maxTotalResults = Math.max(maxTotalResults, totalResults);
        });

        // Sort results
        const sortFunction = sortFunctions[filters.sortBy] || sortFunctions["popularity.desc"];
        allResults.sort(sortFunction);

        // Calculate slice range for pagination
        const sliceStart = startIndex % (TMDB_ITEMS_PER_PAGE * (endTmdbPage - startTmdbPage + 1));
        const sliceEnd = sliceStart + ITEMS_PER_PAGE;
        const pageResults = allResults.slice(sliceStart, sliceEnd);

        // Update state
        setMovies(pageResults);
        setTotalResults(maxTotalResults);
        setTotalPages(Math.min(MAX_PAGES, Math.ceil(maxTotalResults / ITEMS_PER_PAGE)));
      } catch (error) {
        console.error("Error fetching content:", error);
        setMovies([]);
        setTotalResults(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    },
    [filters, calculatePagination, fetchContentType, loading]
  );

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setCurrentPage(page);
        fetchMovies(page);
      }
    },
    [fetchMovies, totalPages, currentPage]
  );

  // Hàm cập nhật filters mà không tự động fetch
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Hàm áp dụng bộ lọc - chỉ gọi khi nhấn nút "Lọc kết quả"
  const applyFilters = useCallback(() => {
    setCurrentPage(1);
    fetchMovies(1);
  }, [fetchMovies]);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
    // Tự động fetch dữ liệu mặc định sau khi clear
    setTimeout(() => fetchMovies(1), 0);
  }, [fetchMovies]);

  // Tự động fetch dữ liệu mặc định khi component mount
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      fetchMovies(1);
    }
  }, [fetchMovies, isInitialized]);

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

export default useMovieFilter;
