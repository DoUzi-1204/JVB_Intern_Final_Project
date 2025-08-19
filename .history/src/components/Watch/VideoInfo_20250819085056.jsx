import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaCalendarAlt, FaGlobe, FaUsers } from "react-icons/fa";
import { CgChevronDoubleRight, CgArrowRight } from "react-icons/cg";

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

  const backdropUrl = movieData.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
    : null;

  return (
    <div
      className="relative rounded-lg p-7"
      style={
        backdropUrl
          ? {
              backgroundImage: `url(${backdropUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(24,26,32,0.75)",
              backgroundBlendMode: "darken",
            }
          : { backgroundColor: "#181A20" }
      }
    >
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
            className="w-[104px] h-40 object-cover rounded-lg border border-white"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1">
          <div className="space-y-3">
            {/* Titles */}
            <div className="text-left mb-4">
              <h2 className="text-xl font-medium text-white mb-2">
                {getTitle("vi")}
              </h2>
              <h3 className="text-base text-yellow-300 font-light">
                {getTitle("en")}
              </h3>
            </div>

            {/* Movie Info Pills - Similar to MovieInfo */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* TMDB Rating */}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                TMDB {movieData.vote_average?.toFixed(1)}
              </span>

              {/* Certification */}
              <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-black px-2 py-1 rounded text-xs font-medium">
                {getCertification()}
              </span>

              {/* Release Year */}
              <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal text-white">
                {getReleaseYear()}
              </span>

              {/* Runtime for movies or Season/Episode for TV */}
              {isMovie ? (
                <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal text-white">
                  {formatRuntime(movieData.runtime)}
                </span>
              ) : (
                movieData.last_episode_to_air && (
                  <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal text-white">
                    {formatRuntime(movieData.runtime)}
                  </span>
                )
              )}
            </div>

            {/* Genres Pills */}
            <div className="text-left">
              <div className="flex flex-wrap gap-2">
                {movieData.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-white/10  px-3 py-1 rounded text-xs font-normal text-white"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="flex-1">
          <p className="text-gray-300 text-sm leading-relaxed text-left line-clamp-4 overflow-hidden">
            {movieData.overview || "Chưa có thông tin tóm tắt."}
          </p>

          {/* Movie Info Button */}
          <div className="text-left mt-5">
            <Link
              to={`/${isMovie ? "movie" : "tv"}/${movieData.id}`}
              className="inline-block px-3 py-2 bg-gradient-to-r from-yellow-600 to-yellow-200 text-black rounded-3xl hover:from-yellow-500 hover:to-yellow-300 transition-all duration-300 font-medium text-sm"
            >
              <span className="flex items-center gap-2">
                <span>Xem thêm</span>
                <CgArrowRight className="text-lg" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
