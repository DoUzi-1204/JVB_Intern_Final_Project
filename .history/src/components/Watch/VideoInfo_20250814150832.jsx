import React from "react";
import { FaStar, FaCalendarAlt, FaGlobe, FaUsers } from "react-icons/fa";

const VideoInfo = ({ movieData, isMovie }) => {
  if (!movieData) return <div>Loading...</div>;

  const formatRuntime = (runtime) => {
    if (!runtime) return "N/A";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const getReleaseYear = () => {
    const date = isMovie ? movieData.release_date : movieData.first_air_date;
    return date ? new Date(date).getFullYear() : "N/A";
  };

  const getTitle = (lang = "vi") => {
    if (lang === "vi") {
      return isMovie
        ? movieData.title_vi || movieData.title
        : movieData.name_vi || movieData.name;
    }
    return isMovie ? movieData.original_title : movieData.original_name;
  };

  const getGenres = () => {
    return movieData.genres?.map((genre) => genre.name).join(", ") || "N/A";
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-6">
      <div className="flex space-x-6">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w300${movieData.poster_path}`
                : "/placeholder-poster.jpg"
            }
            alt={getTitle()}
            className="w-32 h-48 object-cover rounded-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1">
          <div className="space-y-3">
            {/* Titles */}
            <div className="text-left">
              <h2 className="text-2xl font-bold text-white mb-1 text-left">
                {getTitle("vi")}
              </h2>
              <h3 className="text-lg text-gray-300 text-left">{getTitle("en")}</h3>
            </div>

            {/* Rating, Year, Runtime */}
            <div className="flex items-center space-x-4 text-sm justify-start">
              <div className="flex items-center space-x-1">
                <FaStar className="text-yellow-400" />
                <span className="text-white">
                  {movieData.vote_average?.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <FaCalendarAlt className="text-gray-400" />
                <span className="text-white">{getReleaseYear()}</span>
              </div>
              {isMovie && (
                <div className="text-white">
                  {formatRuntime(movieData.runtime)}
                </div>
              )}
              {!isMovie && movieData.last_episode_to_air && (
                <div className="text-white">
                  Phần {movieData.last_episode_to_air.season_number} - Tập{" "}
                  {movieData.last_episode_to_air.episode_number}
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="text-left">
              <span className="text-yellow-400 font-medium">Thể loại: </span>
              <span className="text-white">{getGenres()}</span>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="flex-1">
          <h4 className="text-yellow-400 font-medium mb-2">Tóm tắt</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {movieData.overview || "Chưa có thông tin tóm tắt."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
