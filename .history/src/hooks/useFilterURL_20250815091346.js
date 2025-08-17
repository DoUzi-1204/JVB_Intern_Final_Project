import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { createFilterURL, parseFiltersFromURL } from "../utils/filterUtils";

// Hook để làm việc với filter URLs
const useFilterURL = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy filters hiện tại từ URL
  const getCurrentFilters = useCallback(() => {
    return parseFiltersFromURL(location.search);
  }, [location.search]);

  // Lấy page hiện tại từ URL
  const getCurrentPage = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get("page")) || 1;
  }, [location.search]);

  // Navigate đến filter URL mới
  const navigateToFilter = useCallback(
    (filters, page = 1, replace = false) => {
      const url = createFilterURL(filters, page);
      navigate(url, { replace });
    },
    [navigate]
  );

  // Thêm/cập nhật một filter cụ thể
  const updateFilter = useCallback(
    (filterKey, filterValue, page = 1, replace = true) => {
      const currentFilters = getCurrentFilters();
      const newFilters = {
        ...currentFilters,
        [filterKey]: filterValue,
      };
      navigateToFilter(newFilters, page, replace);
    },
    [getCurrentFilters, navigateToFilter]
  );

  // Xóa một filter cụ thể
  const removeFilter = useCallback(
    (filterKey, page = 1, replace = true) => {
      const currentFilters = getCurrentFilters();
      const newFilters = { ...currentFilters };

      // Reset về giá trị mặc định
      switch (filterKey) {
        case "contentType":
          newFilters.contentType = null;
          break;
        case "genres":
          newFilters.genres = [];
          break;
        case "countries":
          newFilters.countries = [];
          break;
        case "selectedYear":
          newFilters.selectedYear = null;
          break;
        case "ageRatings":
          newFilters.ageRatings = [];
          break;
        case "sortBy":
          newFilters.sortBy = "popularity.desc";
          break;
        default:
          break;
      }

      navigateToFilter(newFilters, page, replace);
    },
    [getCurrentFilters, navigateToFilter]
  );

  // Xóa tất cả filters
  const clearAllFilters = useCallback(
    (replace = true) => {
      const defaultFilters = {
        contentType: null,
        genres: [],
        countries: [],
        selectedYear: null,
        ageRatings: [],
        sortBy: "popularity.desc",
      };
      navigateToFilter(defaultFilters, 1, replace);
    },
    [navigateToFilter]
  );

  return {
    getCurrentFilters,
    getCurrentPage,
    navigateToFilter,
    updateFilter,
    removeFilter,
    clearAllFilters,
    createFilterURL,
  };
};

export default useFilterURL;
