import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TittleFilter from "../components/MovieFilter/TittleFilter";
import FilterPanel from "../components/MovieFilter/FilterPanel/FilterPanel";
import MovieGrid from "../components/MovieFilter/MovieGrid";
import Pagination from "../components/MovieFilter/Pagination";
import PageLoading from "../components/PageLoading";
import useMovieFilter from "../hooks/useMovieFilter";

const FilterPage = () => {
  const {
    filters,
    movies,
    loading,
    currentPage,
    totalPages,
    updateFilters,
    applyFilters,
    clearFilters,
    handlePageChange,
    applyURLFilters,
  } = useMovieFilter();

  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply URL filters when querystring changes (SPA navigation)
  const location = useLocation();
  useEffect(() => {
    // Only apply when on /filter route
    if (location.pathname === "/filter") {
      applyURLFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <>
      {/* Page-scoped loading: show only inside the page area so header/footer remain mounted */}

      <div className="min-h-screen bg-gray-900 pt-20 relative">
        {loading && <PageLoading />}
        <div className="px-4 py-6 space-y-5">
          {/* 1. Title Filter */}
          <TittleFilter />

          {/* 2. Filter Panel */}
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            onApplyFilters={handleApplyFilters}
          />

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
    </>
  );
};

export default FilterPage;
