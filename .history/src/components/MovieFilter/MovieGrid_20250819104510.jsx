import ItemCard from "../ItemCard";
import Skeleton from "../Skeleton";

const MovieGrid = ({ movies, loading }) => {
  const MOVIES_PER_PAGE = 28; // 7 phim x 4 dòng

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
      <div className="grid md:grid-cols-5  lg:grid-cols-6 xl:grid-cols-7 gap-4">
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
    </div>
  );
};

export default MovieGrid;
