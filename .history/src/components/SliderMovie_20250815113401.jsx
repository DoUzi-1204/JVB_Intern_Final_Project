
import { useState } from "react";
import ItemCard from "./ItemCard";
import { MovieCardSkeleton } from "./Skeleton";
import useSlider from "../hooks/useSlider";

const VISIBLE_COUNT = 7;

const SliderMovie = ({
  title,
  endpoint,
  mediaType,
  showViewMore = true,
  limit = 15,
}) => {
  const {
    data,
    loading,
    error,
    retry,
    getCachedPreviewData,
    cachePreviewData,
  } = useSlider(endpoint, mediaType, limit);

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => setStartIndex(Math.max(0, startIndex - 1));
  const handleNext = () =>
    setStartIndex(
      Math.min(data.length - VISIBLE_COUNT, startIndex + 1)
    );

  const visibleMovies = data.slice(startIndex, startIndex + VISIBLE_COUNT);

  const handleViewMore = () => {
    // Navigate to category page or show more items
    console.log(`View more for: ${title}`);
  };

  if (error) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400 mb-2">Không thể tải dữ liệu</p>
          <button
            onClick={retry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {showViewMore && (
          <button
            onClick={handleViewMore}
            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors flex items-center space-x-1"
          >
            <span>Xem thêm</span>
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
        )}
      </div>

      {/* Slider Container */}
      <div className="relative group">
        {loading ? (
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(VISIBLE_COUNT)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <MovieCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-100 transition-opacity duration-300 disabled:opacity-30"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6"
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
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= data.length - VISIBLE_COUNT}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-100 transition-opacity duration-300 disabled:opacity-30"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6"
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
            <div className="flex space-x-4 overflow-hidden">
              {visibleMovies.map((item, index) => (
                <ItemCard
                  key={`${item.id}-${index}`}
                  item={item}
                  mediaType={mediaType}
                  getCachedPreviewData={getCachedPreviewData}
                  cachePreviewData={cachePreviewData}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SliderMovie;
