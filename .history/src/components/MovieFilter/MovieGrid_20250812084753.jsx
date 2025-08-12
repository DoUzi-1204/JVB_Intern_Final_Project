import { useState } from "react";
import ItemCard from "../ItemCard";
import Skeleton from "../Skeleton";

const MovieGrid = ({
  movies,
  loading,
  totalPages,
  totalResults,
  currentPage,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState("");

  const MOVIES_PER_PAGE = 28; // 7 phim x 4 dòng

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleInputPageChange = (e) => {
    const value = e.target.value;
    setInputPage(value);
  };

  const handleInputPageSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setInputPage("");
    }
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
            Không tìm thấy kết quả nào
          </h3>
          <p className="text-gray-400">
            Thử thay đổi bộ lọc để tìm kiếm nội dung khác
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Movie Grid - 7 columns, 4 rows */}
      <div className="grid grid-cols-7 gap-4">
        {movies.map((movie) => (
          <ItemCard
            key={`${movie.id}-${movie.media_type || "movie"}`}
            item={movie}
            mediaType={movie.media_type || "movie"}
          />
        ))}

        {/* Fill empty slots if less than 28 movies */}
        {movies.length < MOVIES_PER_PAGE &&
          Array.from({ length: MOVIES_PER_PAGE - movies.length }).map(
            (_, index) => (
              <div key={`empty-${index}`} className="invisible">
                <Skeleton />
              </div>
            )
          )}
      </div>

      {/* New Pagination Design */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              currentPage === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Trước
          </button>

          {/* Page input */}
          <div className="flex items-center gap-2 text-white bg-gray-900 px-4 py-2 rounded-lg border border-gray-700">
            <span>Trang</span>
            <form
              onSubmit={handleInputPageSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="number"
                min="1"
                max={totalPages}
                value={inputPage}
                onChange={handleInputPageChange}
                placeholder={currentPage.toString()}
                className="w-16 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-center text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:bg-gray-700 transition-all duration-200"
              />
              <span>/</span>
              <span className="font-semibold text-yellow-400">
                {totalPages}
              </span>
            </form>
          </div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            Sau
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
