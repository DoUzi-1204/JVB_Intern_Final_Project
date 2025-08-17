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
    updateFilters,
    clearFilters,
    handlePageChange,
  } = useMovieFilter();

  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleApplyFilters = () => {
    // Thêm hiệu ứng loading và smooth scroll về đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Thêm một chút delay để tạo cảm giác refresh
    setTimeout(() => {
      // Reload toàn bộ trang
      window.location.reload();
    }, 300);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
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
