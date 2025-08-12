import { useState } from "react";
import FilterPanel from "../components/MovieFilter/FilterPanel/FilterPanel";
import MovieGrid from "../components/MovieFilter/MovieGrid";
import useMovieFilter from "../hooks/useMovieFilter";

const FilterPage = () => {
  const {
    filters,
    movies,
    loading,
    hasMore,
    applyFilters,
    clearFilters,
    loadMoreMovies,
    totalResults,
  } = useMovieFilter();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFiltersChange = (newFilters) => {
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const handleApplyFilters = () => {
    // Logic áp dụng filter đã được xử lý trong useMovieFilter
    // Có thể thêm logic bổ sung ở đây nếu cần
    setShowMobileFilters(false); // Đóng mobile filter sau khi apply
  };

  const handleCloseFilters = () => {
    setShowMobileFilters(false);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Lọc Phim</h1>
          <p className="text-gray-400">
            Tìm kiếm phim theo thể loại, quốc gia, năm phát hành và nhiều tiêu
            chí khác
          </p>
        </div>

        {/* Mobile Filter Toggle */}
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

        {/* Layout: Filter Panel trên, Movie Grid dưới */}
        <div className="space-y-6">
          {/* Filter Panel - Mobile (toggleable) */}
          <div className={`lg:hidden ${showMobileFilters ? "block" : "hidden"}`}>
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              onApplyFilters={handleApplyFilters}
              onClose={handleCloseFilters}
            />
          </div>

          {/* Filter Panel - Desktop (always visible) */}
          <div className="hidden lg:block">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              onApplyFilters={handleApplyFilters}
            />
          </div>

          {/* Movie Results */}
          <div>
            {/* Results Summary */}
            {!loading && movies.length > 0 && (
              <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Kết quả tìm kiếm
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Hiển thị {totalResults} phim theo bộ lọc của bạn
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Sắp xếp: </span>
                    <span className="text-yellow-400 font-medium">
                      {filters.sortBy === "popularity.desc" &&
                        "Phổ biến giảm dần"}
                      {filters.sortBy === "popularity.asc" &&
                        "Phổ biến tăng dần"}
                      {filters.sortBy === "vote_average.desc" &&
                        "Đánh giá cao nhất"}
                      {filters.sortBy === "vote_average.asc" &&
                        "Đánh giá thấp nhất"}
                      {filters.sortBy === "release_date.desc" && "Mới nhất"}
                      {filters.sortBy === "release_date.asc" && "Cũ nhất"}
                      {filters.sortBy === "title.asc" && "Tên A-Z"}
                      {filters.sortBy === "title.desc" && "Tên Z-A"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Movie Grid */}
            <MovieGrid
              movies={movies}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMoreMovies}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
