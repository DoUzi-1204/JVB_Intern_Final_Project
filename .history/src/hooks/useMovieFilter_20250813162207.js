import { useState, useEffect, useCallback } from "react";
import { API_CONFIG } from "../utils/constants";

const useMovieFilter = (initialFilters = null) => {
  const defaultFilters = {
    contentType: null, // "movie", "tv", hoặc null (tất cả)
    genres: [],
    countries: [],
    selectedYear: null, // Thay đổi từ yearRange thành selectedYear
    ageRatings: [],
    sortBy: "popularity.desc",
  };

  const [filters, setFilters] = useState(initialFilters || defaultFilters);

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

      // Thêm tham số mặc định: tất cả phim đều không phải phim người lớn
      params.append("include_adult", "false");

      // Thêm tham số mặc định: giới hạn ngày phát hành tối đa là 31/12 của năm hiện tại
      const currentYear = new Date().getFullYear();
      const maxReleaseDate = `${currentYear}-12-31`;

      if (contentType === "movie") {
        params.append("primary_release_date.lte", maxReleaseDate);
      } else {
        params.append("first_air_date.lte", maxReleaseDate);
      }

      // Thêm tham số mặc định cho sắp xếp theo điểm TMDB
      if (filters.sortBy === "vote_average.desc") {
        params.append("vote_count.gte", "300");
      }

      // Add genre filter
      if (filters.genres.length > 0) {
        params.append("with_genres", filters.genres.join(","));
      }

      // Add country filter
      if (filters.countries.length > 0) {
        params.append("with_origin_country", filters.countries.join("|"));
      }

      // Add year filter (sử dụng year thay vì date range)
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

      // Add certification filter (age ratings) - chỉ áp dụng cho movie
      if (contentType === "movie" && filters.ageRatings.length > 0) {
        params.append("certification_country", "US");
        params.append("certification", filters.ageRatings.join("|"));
      }

      const url = `${
        API_CONFIG.BASE_URL
      }/discover/${contentType}?${params.toString()}`;

      // Debug: Log the URL to console
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
      setCurrentPage(page);
      fetchMovies(page);
    },
    [fetchMovies]
  );

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setMovies([]);
    setTotalPages(0);
    setTotalResults(0);
  }, []);

  const clearFilters = useCallback(() => {
    const defaultFilters = {
      contentType: null,
      genres: [],
      countries: [],
      selectedYear: null, // Thay đổi từ yearRange
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
