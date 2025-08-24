import { useState, useCallback, useEffect } from "react";
import { API_CONFIG } from "../utils/constants";

const useMovieFilter = () => {
  const [filters, setFilters] = useState({
    contentType: null, // Mặc định hiển thị tất cả (movie + tv)
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
  const [isInitialized, setIsInitialized] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Hàm đọc URL query parameters
  const getFiltersFromURL = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const filtersFromURL = {
      contentType: urlParams.get("contentType") || null,
      genres: urlParams.get("genres")
        ? urlParams.get("genres").split(",").map(Number)
        : [],
      countries: urlParams.get("countries")
        ? urlParams.get("countries").split(",")
        : [],
      selectedYear: urlParams.get("year")
        ? parseInt(urlParams.get("year"))
        : null,
      ageRatings: urlParams.get("ageRatings")
        ? urlParams.get("ageRatings").split(",")
        : [],
      sortBy: urlParams.get("sortBy") || "popularity.desc",
    };

    const page = urlParams.get("page") ? parseInt(urlParams.get("page")) : 1;

    return { filters: filtersFromURL, page };
  }, []);

  // Hàm cập nhật URL với filters hiện tại
  const updateURL = useCallback((filtersToUpdate, pageToUpdate) => {
    const params = new URLSearchParams();

    // Chỉ thêm param vào URL nếu có giá trị
    if (filtersToUpdate.contentType) {
      params.set("contentType", filtersToUpdate.contentType);
    }

    if (filtersToUpdate.genres.length > 0) {
      params.set("genres", filtersToUpdate.genres.join(","));
    }

    if (filtersToUpdate.countries.length > 0) {
      params.set("countries", filtersToUpdate.countries.join(","));
    }

    if (filtersToUpdate.selectedYear) {
      params.set("year", filtersToUpdate.selectedYear.toString());
    }

    if (filtersToUpdate.ageRatings.length > 0) {
      params.set("ageRatings", filtersToUpdate.ageRatings.join(","));
    }

    if (filtersToUpdate.sortBy !== "popularity.desc") {
      params.set("sortBy", filtersToUpdate.sortBy);
    }

    if (pageToUpdate > 1) {
      params.set("page", pageToUpdate.toString());
    }

    // Cập nhật URL mà không reload trang
    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.pushState({}, "", newURL);
  }, []);

  const buildDiscoverURL = useCallback(
    (contentType, page = 1, filtersArg = filters) => {
      if (!API_KEY || !contentType) return null;

      const params = new URLSearchParams({
        api_key: API_KEY,
        language: "vi-VN",
        page: page.toString(),
        sort_by: filtersArg.sortBy,
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
      if (filtersArg.sortBy === "vote_average.desc") {
        params.append("vote_count.gte", "300");
      }

      // Add genre filter
      if (filtersArg.genres.length > 0) {
        params.append("with_genres", filtersArg.genres.join(","));
      }

      // Add country filter
      if (filtersArg.countries.length > 0) {
        params.append("with_origin_country", filtersArg.countries.join("|"));
      }

      // Add year filter (sử dụng year thay vì date range)
      if (filtersArg.selectedYear) {
        if (contentType === "movie") {
          params.append(
            "primary_release_year",
            filtersArg.selectedYear.toString()
          );
        } else {
          params.append(
            "first_air_date_year",
            filtersArg.selectedYear.toString()
          );
        }
      }

      // Add certification filter (age ratings) - chỉ áp dụng cho movie
      if (contentType === "movie" && filtersArg.ageRatings.length > 0) {
        params.append("certification_country", "US");
        params.append("certification", filtersArg.ageRatings.join("|"));
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
    async (page = 1, filtersOverride = null) => {
      setLoading(true);

      try {
        let allResults = [];
        let maxTotalResults = 0;
        const effectiveFilters = filtersOverride || filters;
        const contentTypes = effectiveFilters.contentType
          ? [effectiveFilters.contentType]
          : ["movie", "tv"];

        // Tính toán page range để lấy đủ 28 items
        const ITEMS_PER_PAGE = 28;
        const TMDB_ITEMS_PER_PAGE = 20;

        // Tính toán page range cần fetch từ TMDB
        const startIndex = (page - 1) * ITEMS_PER_PAGE;

        // Cần lấy 2 trang TMDB cho mỗi trang hiển thị
        const startTmdbPage = Math.floor(startIndex / TMDB_ITEMS_PER_PAGE) + 1;
        const endTmdbPage = startTmdbPage + 1;

        // Fetch data for each content type
        for (const contentType of contentTypes) {
          const typeResults = [];

          for (
            let tmdbPage = startTmdbPage;
            tmdbPage <= endTmdbPage;
            tmdbPage++
          ) {
            const url = buildDiscoverURL(
              contentType,
              tmdbPage,
              effectiveFilters
            );
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

        // Sort combined results using effectiveFilters
        allResults.sort((a, b) => {
          switch (effectiveFilters.sortBy) {
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
      // Cập nhật URL khi chuyển trang
      updateURL(filters, page);
      fetchMovies(page);
    },
    [fetchMovies, filters, updateURL]
  );

  // Hàm cập nhật filters mà không tự động fetch
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Hàm áp dụng bộ lọc - chỉ gọi khi nhấn nút "Lọc kết quả"
  const applyFilters = useCallback(() => {
    setCurrentPage(1);
    // Cập nhật URL khi áp dụng bộ lọc
    updateURL(filters, 1);
    fetchMovies(1);
  }, [fetchMovies, filters, updateURL]);

  const clearFilters = useCallback(() => {
    const defaultFilters = {
      contentType: null, // Mặc định hiển thị tất cả (movie + tv)
      genres: [],
      countries: [],
      selectedYear: null, // Thay đổi từ yearRange
      ageRatings: [],
      sortBy: "popularity.desc",
    };
    setFilters(defaultFilters);
    setCurrentPage(1);
    // Xóa URL parameters khi clear filters
    window.history.pushState({}, "", window.location.pathname);
    // Tự động fetch dữ liệu mặc định sau khi clear
    setTimeout(() => {
      fetchMovies(1);
    }, 0);
  }, [fetchMovies]);

  // Xử lý browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const { filters: urlFilters, page: urlPage } = getFiltersFromURL();
      setFilters(urlFilters);
      setCurrentPage(urlPage);
      // Fetch lại dữ liệu theo URL using urlFilters to avoid race with setState
      setTimeout(() => {
        fetchMovies(urlPage, urlFilters);
      }, 0);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [getFiltersFromURL, fetchMovies]);

  // Khởi tạo từ URL khi component mount
  useEffect(() => {
    if (!isInitialized) {
      const { filters: urlFilters, page: urlPage } = getFiltersFromURL();

      // Kiểm tra xem có parameters nào trong URL không
      const hasURLParams =
        Object.values(urlFilters).some((value) =>
          Array.isArray(value)
            ? value.length > 0
            : value !== null && value !== "popularity.desc"
        ) || urlPage > 1;

      if (hasURLParams) {
        // Nếu có parameters trong URL, sử dụng chúng
        setFilters(urlFilters);
        setCurrentPage(urlPage);
      }

      setIsInitialized(true);
      // Use URL filters explicitly to ensure fetch uses them immediately
      fetchMovies(urlPage, hasURLParams ? urlFilters : null);
    }
  }, [getFiltersFromURL, fetchMovies, isInitialized]);

  // Public helper: apply current URL search params (used by SPA navigation)
  const applyURLFilters = useCallback(() => {
    const { filters: urlFilters, page: urlPage } = getFiltersFromURL();
    setFilters(urlFilters);
    setCurrentPage(urlPage);
    // Fetch using urlFilters explicitly to avoid race with setState
    fetchMovies(urlPage, urlFilters);
  }, [getFiltersFromURL, fetchMovies]);

  // Hàm helper để tạo shareable URL
  const getShareableURL = useCallback(() => {
    const params = new URLSearchParams();

    if (filters.contentType) {
      params.set("contentType", filters.contentType);
    }
    if (filters.genres.length > 0) {
      params.set("genres", filters.genres.join(","));
    }
    if (filters.countries.length > 0) {
      params.set("countries", filters.countries.join(","));
    }
    if (filters.selectedYear) {
      params.set("year", filters.selectedYear.toString());
    }
    if (filters.ageRatings.length > 0) {
      params.set("ageRatings", filters.ageRatings.join(","));
    }
    if (filters.sortBy !== "popularity.desc") {
      params.set("sortBy", filters.sortBy);
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    return params.toString()
      ? `${window.location.origin}${
          window.location.pathname
        }?${params.toString()}`
      : `${window.location.origin}${window.location.pathname}`;
  }, [filters, currentPage]);

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
    applyURLFilters,
    getShareableURL, // Thêm function để lấy URL có thể chia sẻ
  };
};

export default useMovieFilter;
