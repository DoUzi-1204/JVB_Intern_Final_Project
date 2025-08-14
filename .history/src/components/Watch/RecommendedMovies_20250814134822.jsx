import React from "react";
import { Link } from "react-router-dom";
import { API_CONFIG } from "../../utils/constants";
import Image404 from "../404Image";

const RecommendedMovies = ({ recommendations }) => {
  const IMAGE_BASE_URL = API_CONFIG.IMAGE_BASE_URL;

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : "N/A";
  };

  const formatYear = (date) => {
    return date ? new Date(date).getFullYear() : "";
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Phim đề xuất</h3>
        <p className="text-gray-400 text-center py-8">
          Không có phim đề xuất
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Phim đề xuất</h3>
      
      <div className="space-y-4">
        {recommendations.slice(0, 6).map((movie) => (
          <Link
            key={movie.id}
            to={`/${movie.media_type || (movie.title ? 'movie' : 'tv')}/${movie.id}`}
            className="flex gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            {/* Poster */}
            <div className="w-16 h-24 flex-shrink-0 rounded overflow-hidden">
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}/w185${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image404 className="w-full h-full" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">
                {movie.title || movie.name}
              </h4>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 text-xs">
                  ⭐ {formatRating(movie.vote_average)}
                </span>
                <span className="text-gray-400 text-xs">
                  {formatYear(movie.release_date || movie.first_air_date)}
                </span>
              </div>

              <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                {movie.overview || "Không có mô tả"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {recommendations.length > 6 && (
        <div className="mt-4 text-center">
          <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendedMovies;
