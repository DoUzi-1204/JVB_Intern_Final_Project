// Helper functions for movie filtering
import { API_CONFIG } from "./constants";

export const buildMovieDiscoverURL = (filters, page = 1, apiKey) => {
  if (!apiKey) return null;

  const params = new URLSearchParams({
    api_key: apiKey,
    language: "vi-VN",
    page: page.toString(),
    sort_by: filters.sortBy || "popularity.desc",
  });

  // Add genre filter
  if (filters.genres && filters.genres.length > 0) {
    params.append("with_genres", filters.genres.join(","));
  }

  // Add country filter
  if (filters.countries && filters.countries.length > 0) {
    params.append("with_origin_country", filters.countries.join("|"));
  }

  // Add year filter (thay đổi từ date range thành year)
  if (filters.selectedYear) {
    params.append("primary_release_year", filters.selectedYear.toString());
  }

  // Add certification filter (age ratings)
  if (filters.ageRatings && filters.ageRatings.length > 0) {
    params.append("certification_country", "US");
    params.append("certification", filters.ageRatings.join("|"));
  }

  // Add minimum vote count to filter out movies with very few votes
  params.append("vote_count.gte", "100");

  return `${API_CONFIG.BASE_URL}/discover/movie?${params.toString()}`;
};

export const buildTVDiscoverURL = (filters, page = 1, apiKey) => {
  if (!apiKey) return null;

  const params = new URLSearchParams({
    api_key: apiKey,
    language: "vi-VN",
    page: page.toString(),
    sort_by: filters.sortBy || "popularity.desc",
  });

  // Add genre filter
  if (filters.genres && filters.genres.length > 0) {
    params.append("with_genres", filters.genres.join(","));
  }

  // Add country filter
  if (filters.countries && filters.countries.length > 0) {
    params.append("with_origin_country", filters.countries.join("|"));
  }

  // Add year filter for TV shows (thay đổi từ date range thành year)
  if (filters.selectedYear) {
    params.append("first_air_date_year", filters.selectedYear.toString());
  }

  // Add minimum vote count
  params.append("vote_count.gte", "50");

  return `${API_CONFIG.BASE_URL}/discover/tv?${params.toString()}`;
};

// Filter validation functions
export const validateFilters = (filters) => {
  const errors = [];

  // Validate year range
  if (filters.yearRange) {
    if (filters.yearRange.min && filters.yearRange.max) {
      if (filters.yearRange.min > filters.yearRange.max) {
        errors.push("Năm bắt đầu không thể lớn hơn năm kết thúc");
      }
    }
  }

  return errors;
};

// Get active filter count
export const getActiveFilterCount = (filters) => {
  let count = 0;

  if (filters.genres && filters.genres.length > 0) count++;
  if (filters.countries && filters.countries.length > 0) count++;
  if (filters.yearRange && (filters.yearRange.min || filters.yearRange.max))
    count++;
  if (filters.ageRatings && filters.ageRatings.length > 0) count++;
  if (filters.sortBy && filters.sortBy !== "popularity.desc") count++;

  return count;
};

// Format filter summary for display
export const formatFilterSummary = (filters) => {
  const summary = [];

  if (filters.genres && filters.genres.length > 0) {
    summary.push(`${filters.genres.length} thể loại`);
  }

  if (filters.countries && filters.countries.length > 0) {
    summary.push(`${filters.countries.length} quốc gia`);
  }

  if (filters.yearRange && (filters.yearRange.min || filters.yearRange.max)) {
    if (filters.yearRange.min && filters.yearRange.max) {
      summary.push(`${filters.yearRange.min} - ${filters.yearRange.max}`);
    } else if (filters.yearRange.min) {
      summary.push(`Từ ${filters.yearRange.min}`);
    } else if (filters.yearRange.max) {
      summary.push(`Đến ${filters.yearRange.max}`);
    }
  }

  if (filters.ageRatings && filters.ageRatings.length > 0) {
    summary.push(`${filters.ageRatings.length} độ tuổi`);
  }

  return summary.join(", ");
};

// Reset filters to default state
export const getDefaultFilters = () => ({
  genres: [],
  countries: [],
  yearRange: { min: null, max: null },
  ageRatings: [],
  sortBy: "popularity.desc",
});

// Check if filters are in default state
export const isDefaultFilters = (filters) => {
  const defaultFilters = getDefaultFilters();

  return (
    filters.genres.length === 0 &&
    filters.countries.length === 0 &&
    !filters.yearRange.min &&
    !filters.yearRange.max &&
    filters.ageRatings.length === 0 &&
    filters.sortBy === defaultFilters.sortBy
  );
};
