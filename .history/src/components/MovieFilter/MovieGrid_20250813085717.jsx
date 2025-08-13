import ItemCard from "../ItemCard";
import Skeleton from "../Skeleton";

const MovieGrid = ({ movies, loading }) => {
  const MOVIES_PER_PAGE = 28; // 7 phim x 4 dòng

  if (loading) {
    return (
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: MOVIES_PER_PAGE }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
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

  // Đảm bảo luôn hiển thị đúng grid 7x4 (28 ô)
  const displayMovies = [...movies];
  
  // Log để debug
  console.log(`MovieGrid: Displaying ${displayMovies.length} movies out of target ${MOVIES_PER_PAGE}`);

  return (
    <div className="space-y-6">
      {/* Movie Grid - 7 columns, 4 rows */}
      <div className="grid grid-cols-7 gap-4">
        {/* Hiển thị phim thực tế */}
        {displayMovies.map((movie) => (
          <ItemCard
            key={`${movie.id}-${movie.media_type || "movie"}`}
            item={movie}
            mediaType={movie.media_type || "movie"}
          />
        ))}

        {/* Fill empty slots nếu ít hơn 28 phim để maintain grid layout */}
        {displayMovies.length < MOVIES_PER_PAGE &&
          Array.from({ length: MOVIES_PER_PAGE - displayMovies.length }).map(
            (_, index) => (
              <div key={`empty-${index}`} className="invisible aspect-[2/3]">
                {/* Empty slot để maintain grid structure */}
                <div className="w-full h-full"></div>
              </div>
            )
          )}
      </div>

      {/* Debug info - chỉ hiển thị trong development */}
      {import.meta.env.DEV && (
        <div className="text-xs text-gray-500 text-center">
          Hiển thị {displayMovies.length}/{MOVIES_PER_PAGE} phim
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
