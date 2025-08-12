import { useState } from "react";
import TittleFilter from "../components/MovieFilter/TittleFilter";
import FilterPanel from "../components/MovieFilter/FilterPanel/FilterPanel";
import MovieGrid from "../components/MovieFilter/MovieGrid";
import Pagination from "../components/MovieFilter/Pagination";
import useMovieFilter from "../hooks/useMovieFilter";

const FilterPage = () => {
  const {
    filters,
    movies,
    loading,
    currentPage,
    totalPages,
    applyFilters,
    clearFilters,
    handlePageChange,
  } = useMovieFilter();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFiltersChange = (newFilters) => {
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const handleApplyFilters = () => {
    setShowMobileFilters(false); // Đóng mobile filter sau khi apply
  };

  const handleCloseFilters = () => {
    setShowMobileFilters(false);
  };

  const handleCloseDesktopFilters = () => {
    setShowDesktopFilters(false);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const toggleDesktopFilters = () => {
    setShowDesktopFilters(!showDesktopFilters);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* 1. Title Filter */}
        <TittleFilter />

        {/* 2. Filter Panel */}
        {/* Mobile Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleMobileFilters}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Bộ lọc phim
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform duration-200 ${
                showMobileFilters ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Filter Panel - Mobile */}
        <div className={`lg:hidden ${showMobileFilters ? "block" : "hidden"}`}>
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            onApplyFilters={handleApplyFilters}
            onClose={handleCloseFilters}
          />
        </div>

        {/* Filter Panel - Desktop */}
        <div className="hidden lg:block">
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            onApplyFilters={handleApplyFilters}
            onClose={handleCloseDesktopFilters}
          />
        </div>

        {/* 3. Movie Grid */}
        <MovieGrid movies={movies} loading={loading} />

        {/* 4. Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FilterPage;
