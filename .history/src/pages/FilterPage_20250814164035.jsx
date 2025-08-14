import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import TittleFilter from "../components/MovieFilter/TittleFilter";
import FilterPanel from "../components/MovieFilter/FilterPanel/FilterPanel";
import MovieGrid from "../components/MovieFilter/MovieGrid";
import Pagination from "../components/MovieFilter/Pagination";
import useMovieFilter from "../hooks/useMovieFilter";

const FilterPage = () => {
  const [searchParams] = useSearchParams();
  
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
  } = useMovieFilter();

  // Generate dynamic title based on search parameters
  const pageTitle = useMemo(() => {
    const genreName = searchParams.get('genreName');
    const countryName = searchParams.get('countryName');
    const type = searchParams.get('type');
    
    if (genreName) {
      return `Phim ${genreName}`;
    }
    if (countryName) {
      return `Phim ${countryName}`;
    }
    if (type === 'movie') {
      return 'Phim Lẻ';
    }
    if (type === 'tv') {
      return 'Phim Bộ';
    }
    return 'Lọc Phim';
  }, [searchParams]);

  // Apply filters based on URL parameters when component mounts
  useEffect(() => {
    const genre = searchParams.get('genre');
    const country = searchParams.get('country');
    const type = searchParams.get('type');
    
    if (genre || country || type) {
      const newFilters = {};
      
      if (genre) {
        newFilters.genres = [genre];
      }
      if (country) {
        newFilters.countries = [country];
      }
      if (type) {
        newFilters.contentType = type;
      }
      
      updateFilters(newFilters);
      // Automatically apply filters when coming from header links
      setTimeout(() => {
        applyFilters();
      }, 100);
    }
  }, [searchParams, updateFilters, applyFilters]);

  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-6 space-y-5">
        {/* 1. Title Filter */}
        <TittleFilter title={pageTitle} />

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
