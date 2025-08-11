import React from "react";
import { FaPlay, FaHeart } from "react-icons/fa";
import { HiMiniListBullet } from "react-icons/hi2";
import { FaCircleInfo } from "react-icons/fa6";

const MoviePreview = ({
  data,
  getCertification,
  formatRuntime,
  formatReleaseYear,
  navigate,
  mediaType,
}) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  const movieVi = data.vi;
  const movieEn = data.en;

  const backdropUrl = movieVi?.backdrop_path
    ? `${IMAGE_BASE_URL}/w1280${movieVi.backdrop_path}`
    : "";

  const titleVi = movieVi?.title || "";
  const titleEn = movieEn?.title || "";
  const certification = getCertification(movieVi, "movie");
  const releaseYear = formatReleaseYear(movieVi?.release_date);
  const runtime = formatRuntime(movieVi?.runtime);
  const rating = movieVi?.vote_average?.toFixed(1) || "N/A";

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-[26rem] bg-gray-700 rounded-lg overflow-hidden shadow-2xl z-50">
      {/* Backdrop Image Section */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          {/* Gradient Overlay to blur the bottom edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-700 via-transparent to-transparent"></div>
        </div>
        {/* Soft edge blur effect */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-700 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="px-4 pt-1 pb-5 bg-gray-700 h-48 flex flex-col justify-between">
        {/* Titles */}
        <div className="mb-2">
          {titleVi && (
            <h3 className="text-white font-bold text-lg  line-clamp-1 text-left">
              {titleVi}
            </h3>
          )}
          {titleEn && (
            <p className="text-yellow-300 text-sm line-clamp-1 text-left">
              {titleEn}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 mb-3">
          {/* Xem phim */}
          <button className="bg-gradient-to-r from-yellow-200 to-yellow-400 backdrop-blur-sm text-black px-4 py-2 rounded-full font-semibold text-sm flex items-center space-x-2 hover:from-yellow-400 hover:to-yellow-500 transition-colors">
            <FaPlay className="w-2 h-2" />
            <span>Xem ngay</span>
          </button>

          {/* Chi tiết */}
          <button
            className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 hover:text-yellow-300 transition-colors"
            title="Chi tiết"
          >
            <FaCircleInfo className="w-4 h-4 transition-colors flex-shrink-0" />
            <span className="leading-none">Chi tiết</span>
          </button>

          {/* Yêu thích */}
          <button
            className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white p-2.5 rounded-full transition-colors hover:text-yellow-300"
            title="Yêu thích"
          >
            <FaHeart className="w-3 h-3 transition-colors" />
          </button>

          {/* Thêm vào danh sách */}
          <button
            className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors hover:text-yellow-300"
            title="Thêm vào danh sách"
          >
            <HiMiniListBullet className="w-4 h-4 transition-colors" />
          </button>
        </div>

        {/* Movie Info */}
        <div className="space-y-2">
          <div className="flex items-center flex-wrap gap-2">
            {/* TMDB Rating */}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-normal backdrop-blur-sm">
              TMDB {rating}
            </span>

            {/* Certification */}
            <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-black px-2 py-1 rounded text-xs font-medium">
              {certification}
            </span>
            {releaseYear && (
              <span className="bg-white/10 border border-white/50 text-white text-xs px-2 py-1 rounded">
                {releaseYear}
              </span>
            )}
            {runtime && (
              <span className="bg-white/10 border border-white/50 text-white text-xs px-2 py-1 rounded">
                {runtime}
              </span>
            )}
          </div>

          {/* Genres */}
          {movieVi?.genres && movieVi.genres.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {movieVi.genres.slice(0, 3).map((genre, index) => (
                <div
                  key={genre.id}
                  className="flex items-center space-x-1 text-white font-light text-xs"
                >
                  <span>{genre.name}</span>
                  {index < Math.min(movieVi.genres.length, 3) - 1 && (
                    <span className="text-lg leading-none">•</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
