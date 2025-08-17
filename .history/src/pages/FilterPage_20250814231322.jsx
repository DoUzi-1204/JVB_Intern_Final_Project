import { useEffect, useState } from "react";
import TittleFilter from "../components/MovieFilter/TittleFilter";
import FilterPanel from "../components/MovieFilter/FilterPanel/FilterPanel";
import MovieGrid from "../components/MovieFilter/MovieGrid";
import Pagination from "../components/MovieFilter/Pagination";
import Loading from "../components/Loading";
import useMovieFilter from "../hooks/useMovieFilter";

const FilterPage = () => {
  const [isPageRefreshing, setIsPageRefreshing] = useState(false);
  
  const {
    filters,
    movies,
    loading,
    isReloading,
    reloadMessage,
    currentPage,
    totalPages,
    updateFilters,
    applyFilters,
    clearFilters,
    handlePageChange,
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

  // Handle page refresh detection
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsPageRefreshing(true);
      // Store in sessionStorage to persist through refresh
      sessionStorage.setItem('pageRefreshing', 'true');
    };

    // Check if page was refreshed
    const checkIfRefresh = () => {
      // Check sessionStorage first
      const wasRefreshing = sessionStorage.getItem('pageRefreshing');
      if (wasRefreshing) {
        setIsPageRefreshing(true);
        sessionStorage.removeItem('pageRefreshing');
        // Hide loading after a short delay
        setTimeout(() => {
          setIsPageRefreshing(false);
        }, 1500);
        return;
      }

      // Alternative check using performance API
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navigationEntry = navigationEntries[0];
        if (navigationEntry.type === 'reload') {
          setIsPageRefreshing(true);
          setTimeout(() => {
            setIsPageRefreshing(false);
          }, 1500);
        }
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check on component mount
    checkIfRefresh();

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {/* Show loading overlay when reloading or page refreshing */}
      {(isReloading || isPageRefreshing) && (
        <Loading 
          message={isPageRefreshing ? "Đang tải lại trang..." : reloadMessage} 
        />
      )}

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
    </>
  );
};

export default FilterPage;
