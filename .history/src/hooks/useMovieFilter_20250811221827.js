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

      return `${
        API_CONFIG.BASE_URL
      }/discover/${contentType}?${params.toString()}`;
    },
    [API_KEY, filters]
  );

  const fetchMovies = useCallback(
    async (page = 1) => {
      setLoading(true);

      try {
        let allResults = [];
        const contentTypes = filters.contentType
          ? [filters.contentType]
          : ["movie", "tv"];

        // Fetch data for each content type
        for (const contentType of contentTypes) {
          const url = buildDiscoverURL(contentType, page);
          if (!url) continue;

          const response = await fetch(url);
          const data = await response.json();

          if (data.results) {
            // Fetch multiple pages to get enough content for pagination
            const typeResults = [...data.results];
            const totalPagesToFetch = Math.min(5, data.total_pages); // Fetch up to 5 pages per type

            // Fetch additional pages if needed
            const promises = [];
            for (let i = 2; i <= totalPagesToFetch; i++) {
              const pageUrl = buildDiscoverURL(contentType, i);
              promises.push(fetch(pageUrl).then((res) => res.json()));
            }

            if (promises.length > 0) {
              const additionalData = await Promise.all(promises);
              additionalData.forEach((pageData) => {
                if (pageData.results) {
                  typeResults.push(...pageData.results);
                }
              });
            }

            // Add media_type to results
            const processedResults = typeResults.map((item) => ({
              ...item,
              media_type: contentType,
            }));

            allResults.push(...processedResults);
          }
        }

        // Sort by popularity if mixing content types
        if (!filters.contentType) {
          allResults.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        }

        setMovies(allResults);
        setTotalResults(allResults.length);

        // Calculate pagination based on 28 items per page
        const itemsPerPage = 28;
        const calculatedTotalPages = Math.ceil(
          allResults.length / itemsPerPage
        );
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    },
    [buildDiscoverURL, filters.contentType]
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
