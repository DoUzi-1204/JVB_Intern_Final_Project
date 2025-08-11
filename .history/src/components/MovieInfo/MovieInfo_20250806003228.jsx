import React, { useState, useEffect } from "react";
import { FaStar, FaCalendar, FaClock, FaGlobe } from "react-icons/fa";

const MovieInfo = ({ movieData, credits, isMovie }) => {
  const [certification, setCertification] = useState("");

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  // Get certification
  useEffect(() => {
    if (movieData?.release_dates?.results || movieData?.content_ratings?.results) {
      const certData = isMovie ? movieData.release_dates?.results : movieData.content_ratings?.results;
      const usCert = certData?.find(item => item.iso_3166_1 === "US");
      
      if (usCert) {
        const cert = isMovie ? usCert.release_dates?.[0]?.certification : usCert.rating;
        setCertification(cert || "");
      }
    }
  }, [movieData, isMovie]);

  // Helper functions
  const formatRuntime = (runtime) => {
    if (!runtime) return "";
    
    if (isMovie) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    } else {
      return `${runtime}m/tập`;
    }
  };

  const getDirector = () => {
    if (!credits?.crew) return "";
    const director = credits.crew.find(person => person.job === "Director");
    return director?.name || "";
  };

  const getMainCast = () => {
    if (!credits?.cast) return [];
    return credits.cast.slice(0, 6); // Top 6 diễn viên chính
  };

  const posterUrl = movieData?.poster_path 
    ? `${IMAGE_BASE_URL}/w500${movieData.poster_path}`
    : null;

  const titleVi = movieData?.title || movieData?.name || "";
  const titleEn = movieData?.original_title || movieData?.original_name || "";
  
  // Nếu không có tên tiếng việt thì dùng tên tiếng anh cho cả 2
  const displayTitleVi = titleVi || titleEn;
  const displayTitleEn = titleVi ? titleEn : titleEn;

  const releaseYear = movieData?.release_date || movieData?.first_air_date 
    ? new Date(movieData.release_date || movieData.first_air_date).getFullYear()
    : "";

  const runtime = movieData?.runtime || (movieData?.episode_run_time && movieData.episode_run_time[0]);

  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="lg:col-span-1">
          {posterUrl && (
            <div className="w-full max-w-sm mx-auto lg:mx-0">
              <img
                src={posterUrl}
                alt={displayTitleVi}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Movie Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Titles */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight text-white">
              {displayTitleVi}
            </h1>
            {displayTitleEn && displayTitleVi !== displayTitleEn && (
              <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
                {displayTitleEn}
              </h2>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {/* Rating */}
            {movieData?.vote_average > 0 && (
              <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
                <FaStar className="w-4 h-4" />
                <span>{movieData.vote_average.toFixed(1)}</span>
              </div>
            )}

            {/* Certification */}
            {certification && (
              <div className="border border-gray-400 px-3 py-1 rounded text-gray-300 font-medium">
                {certification}
              </div>
            )}

            {/* Release Year */}
            {releaseYear && (
              <div className="flex items-center gap-2 text-gray-300">
                <FaCalendar className="w-4 h-4" />
                <span>{releaseYear}</span>
              </div>
            )}

            {/* Runtime for Movies */}
            {isMovie && runtime && (
              <div className="flex items-center gap-2 text-gray-300">
                <FaClock className="w-4 h-4" />
                <span>{formatRuntime(runtime)}</span>
              </div>
            )}

            {/* Season & Episode for TV Shows */}
            {!isMovie && movieData?.last_episode_to_air && (
              <>
                <div className="text-gray-300">
                  Phần {movieData.last_episode_to_air.season_number}
                </div>
                <div className="text-gray-300">
                  Tập {movieData.last_episode_to_air.episode_number}
                </div>
              </>
            )}

            {/* Runtime for TV Shows */}
            {!isMovie && runtime && (
              <div className="flex items-center gap-2 text-gray-300">
                <FaClock className="w-4 h-4" />
                <span>{formatRuntime(runtime)}</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {movieData?.genres && movieData.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movieData.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm border border-gray-600"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          {movieData?.overview && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">Giới thiệu</h3>
              <p className="text-gray-300 leading-relaxed">
                {movieData.overview}
              </p>
            </div>
          )}

          {/* Additional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Country */}
              {movieData?.origin_country && movieData.origin_country.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                    <FaGlobe className="w-4 h-4" />
                    Quốc gia
                  </h4>
                  <p className="text-gray-300">
                    {movieData.origin_country.join(", ")}
                  </p>
                </div>
              )}

              {/* Production Companies */}
              {movieData?.production_companies && movieData.production_companies.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Sản xuất</h4>
                  <p className="text-gray-300">
                    {movieData.production_companies.map(company => company.name).join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Director */}
              {getDirector() && (
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Đạo diễn</h4>
                  <p className="text-gray-300">{getDirector()}</p>
                </div>
              )}

              {/* Runtime Display */}
              {runtime && (
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Thời lượng</h4>
                  <p className="text-gray-300">{formatRuntime(runtime)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Cast */}
          {getMainCast().length > 0 && (
            <div>
              <h4 className="font-semibold text-yellow-400 mb-4">Diễn viên</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {getMainCast().map((actor) => (
                  <div key={actor.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                      {actor.profile_path ? (
                        <img
                          src={`${IMAGE_BASE_URL}/w92${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                          N/A
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white text-sm truncate">
                        {actor.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;