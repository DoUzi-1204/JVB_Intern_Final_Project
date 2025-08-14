import React from "react";
import { Link } from "react-router-dom";
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

  const getCertification = () => {
    if (!movieData?.certifications) return "NR";

    const certData = isMovie
      ? movieData.certifications.results
      : movieData.certifications.results;

    const usCert = certData?.find((item) => item.iso_3166_1 === "US");

    if (usCert) {
      const cert = isMovie
        ? usCert.release_dates?.[0]?.certification
        : usCert.rating;
      return cert || "NR";
    }
    return "NR";
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
            <div className="text-left mb-4">
              <h2 className="text-2xl font-bold text-white mb-1">
                {getTitle("vi")}
              </h2>
              <h3 className="text-lg text-yellow-300 font-light">
                {getTitle("en")}
              </h3>
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
          <h4 className="text-yellow-400 font-medium mb-2 text-left">
            Tóm tắt
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed text-left line-clamp-5 overflow-hidden">
            {movieData.overview || "Chưa có thông tin tóm tắt."}
          </p>

          {/* Movie Info Button */}
          <div className="text-left mt-4">
            <Link
              to={`/${isMovie ? "movie" : "tv"}/${movieData.id}`}
              className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 font-medium text-sm"
            >
              <span>Thông tin phim</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
