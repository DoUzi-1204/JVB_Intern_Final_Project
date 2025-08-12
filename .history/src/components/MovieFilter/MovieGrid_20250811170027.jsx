import { useState, useEffect } from "react";
import ItemCard from "../ItemCard";
import Skeleton from "../Skeleton";

const MovieGrid = ({ movies, loading, totalPages, currentPage, onPageChange }) => {
  const [displayMovies, setDisplayMovies] = useState([]);
  
  const MOVIES_PER_PAGE = 28; // 7 phim x 4 dòng
  
  useEffect(() => {
    // Tính toán phim để hiển thị cho trang hiện tại
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    setDisplayMovies(movies.slice(startIndex, endIndex));
  }, [movies, currentPage]);

  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tạo array của số trang để hiển thị
  const getPageNumbers = () => {
    const delta = 2; // Số trang hiển thị xung quanh trang hiện tại
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (loading && movies.length === 0) {
    return (
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 28 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (!loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">
            Không tìm thấy phim nào
          </h3>
          <p className="text-gray-400">
            Thử thay đổi bộ lọc để tìm kiếm phim khác
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-white text-lg">
          Tìm thấy{" "}
          <span className="font-semibold text-yellow-400">{movies.length}</span>{" "}
          phim
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Grid View
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <ItemCard
            key={`${movie.id}-${movie.media_type || "movie"}`}
            item={movie}
            mediaType={movie.media_type || "movie"}
          />
        ))}
      </div>

      {/* Load More / Loading */}
      {(loadingMore || (hasMore && movies.length > 0)) && (
        <div className="flex justify-center py-8">
          {loadingMore ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
              <span className="text-white">Đang tải thêm phim...</span>
            </div>
          ) : (
            hasMore && (
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition-colors duration-200"
              >
                Tải thêm phim
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
