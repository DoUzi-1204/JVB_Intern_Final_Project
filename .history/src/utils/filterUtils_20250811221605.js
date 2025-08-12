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

// Validate filters
export const validateFilters = (filters) => {
  const errors = [];

  if (filters.selectedYear) {
    const currentYear = new Date().getFullYear();
    if (filters.selectedYear < 1900 || filters.selectedYear > currentYear) {
      errors.push("Năm phải trong khoảng từ 1900 đến hiện tại");
    }
  }

  return errors;
};

// Get active filter count
export const getActiveFilterCount = (filters) => {
  let count = 0;

  if (filters.genres && filters.genres.length > 0) count++;
  if (filters.countries && filters.countries.length > 0) count++;
  if (filters.selectedYear) count++; // Thay đổi từ yearRange
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

  if (filters.selectedYear) { // Thay đổi từ yearRange
    summary.push(`Năm ${filters.selectedYear}`);
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
