import { useState } from "react";
import TittleFilter from "../components/MovieFilter/TittleFilter";
import FilterPanel from "../components/MovieFilter/FilterPanel/FilterPanel";
import MovieGrid from "../components/MovieFilter/MovieGrid";
import Pagination from "../components/MovieFilter/Pagination";
import useMovieFilter from "../hooks/useMovieFilter";

const FilterPage = () => {
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  
  const {
    filters,
    movies,
    loading,
    currentPage,
    totalPages,
    updateFilters,
    clearFilters,
    handlePageChange,
  } = useMovieFilter();

  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setIsApplyingFilters(true);
    
    // Scroll về đầu trang với hiệu ứng smooth
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Thêm delay để tạo cảm giác loading
    setTimeout(() => {
      // Reload toàn bộ trang
      window.location.reload();
    }, 500);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Loading overlay khi đang áp dụng bộ lọc */}
      {isApplyingFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-3"></div>
            <p>Đang áp dụng bộ lọc...</p>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-6 space-y-5">
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
  );
};

export default FilterPage;
