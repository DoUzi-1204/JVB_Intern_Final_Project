import { useState, useEffect, useCallback } from "react";
import { API_CONFIG } from "../utils/constants";

const useMovieFilter = () => {
  const [filters, setFilters] = useState({
    contentType: null, // "movie", "tv", hoặc null (tất cả)
    genres: [],
    countries: [],
    selectedYear: null, // Thay đổi từ yearRange thành selectedYear
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

        // Để đảm bảo có đủ 28 phim, fetch nhiều trang hơn
        const pagesToFetch = Math.ceil((page * ITEMS_PER_PAGE) / TMDB_ITEMS_PER_PAGE) + 1;
        const startTmdbPage = Math.max(1, pagesToFetch - 2);
        const endTmdbPage = pagesToFetch + 1;

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

            try {
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
            } catch (error) {
              console.error(`Error fetching page ${tmdbPage}:`, error);
            }
          }

          // Add media_type to results
          const processedResults = typeResults.map((item) => ({
            ...item,
            media_type: contentType,
          }));

          allResults.push(...processedResults);
        }

        // Remove duplicates based on ID and media_type
        const uniqueResults = allResults.reduce((acc, current) => {
          const existingItem = acc.find(
            item => item.id === current.id && item.media_type === current.media_type
          );
          if (!existingItem) {
            acc.push(current);
          }
          return acc;
        }, []);

        // Sort combined results
        uniqueResults.sort((a, b) => {
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

        // Tính toán index để slice đúng 28 items cho trang hiện tại
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        
        // Lấy đúng 28 items cho trang hiện tại
        const pageResults = uniqueResults.slice(startIndex, endIndex);

        // Đảm bảo luôn có đúng 28 items (pad với empty objects nếu cần)
        const paddedResults = [...pageResults];
        while (paddedResults.length < ITEMS_PER_PAGE && startIndex < uniqueResults.length) {
          paddedResults.push(null); // Add placeholder
        }

        setMovies(pageResults); // Chỉ set phim thực tế, không pad
        setTotalResults(maxTotalResults);

        // Tính total pages dựa trên 28 items per page
        const calculatedTotalPages = Math.ceil(
          maxTotalResults / ITEMS_PER_PAGE
        );
        setTotalPages(Math.min(500, calculatedTotalPages)); // TMDB giới hạn 500 pages
      } catch (error) {
        console.error("Error fetching content:", error);
        setMovies([]);
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
