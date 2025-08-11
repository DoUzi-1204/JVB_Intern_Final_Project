import React from "react";
import { FaStar, FaCalendar, FaClock, FaGlobe } from "react-icons/fa";

const MovieInfo = ({ movieData, credits, isMovie }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  // Country mapping
  const countryMap = {
    US: "Mỹ",
    KR: "Hàn Quốc",
    JP: "Nhật Bản",
    CN: "Trung Quốc",
    VN: "Việt Nam",
    TH: "Thái Lan",
    IN: "Ấn Độ",
    GB: "Anh",
    FR: "Pháp",
    DE: "Đức",
    IT: "Ý",
    ES: "Tây Ban Nha",
    RU: "Nga",
    CA: "Canada",
    AU: "Úc",
    BR: "Brazil",
    MX: "Mexico",
    AR: "Argentina",
    CL: "Chile",
    CO: "Colombia",
  };

  const getCountryName = (countryCode) => {
    return countryMap[countryCode] || countryCode;
  };

  // Get certification
  const getCertification = () => {
    if (!movieData?.certifications) return "";

    const certData = isMovie
      ? movieData.certifications.results
      : movieData.certifications.results;

    const usCert = certData?.find((item) => item.iso_3166_1 === "US");

    if (usCert) {
      const cert = isMovie
        ? usCert.release_dates?.[0]?.certification
        : usCert.rating;
      return cert || "";
    }
    return "";
  };

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
    const director = credits.crew.find((person) => person.job === "Director");
    return director?.name || "";
  };

  const getMainCast = () => {
    if (!credits?.cast) return [];
    return credits.cast.slice(0, 6);
  };

  const posterUrl = movieData?.poster_path
    ? `${IMAGE_BASE_URL}/w500${movieData.poster_path}`
    : null;

  const titleVi = movieData?.title || movieData?.name || "";
  const titleEn = movieData?.original_title || movieData?.original_name || "";

  // Logic tên hiển thị
  const displayTitleVi = titleVi || titleEn;
  const displayTitleEn = titleVi ? titleEn : titleEn;

  const releaseYear =
    movieData?.release_date || movieData?.first_air_date
      ? new Date(
          movieData.release_date || movieData.first_air_date
        ).getFullYear()
      : "";

  const runtime =
    movieData?.runtime ||
    (movieData?.episode_run_time && movieData.episode_run_time[0]);

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-6 text-white shadow-2xl">
      {/* Poster */}
      <div className="mb-6">
        {posterUrl && (
          <img
            src={posterUrl}
            alt={displayTitleVi}
            className="w-full rounded-lg shadow-xl"
          />
        )}
      </div>

      {/* Movie Titles */}
      <div className="mb-6 text-left">
        <h1 className="text-2xl font-bold mb-2 leading-tight text-white">
          {displayTitleVi}
        </h1>
        {displayTitleEn && displayTitleVi !== displayTitleEn && (
          <h2 className="text-lg text-gray-300 font-medium">
            {displayTitleEn}
          </h2>
        )}
      </div>

      {/* Meta Information - Style như Banner */}
      <div className="mb-6 text-left">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Rating */}
          {movieData?.vote_average > 0 && (
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
              <FaStar className="w-3 h-3" />
              {movieData.vote_average.toFixed(1)}
            </span>
          )}

          {/* Certification */}
          {getCertification() && (
            <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
              {getCertification()}
            </span>
          )}

          {/* Release Year */}
          {releaseYear && (
            <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
              {releaseYear}
            </span>
          )}

          {/* Runtime */}
          {runtime && (
            <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
              {formatRuntime(runtime)}
            </span>
          )}
        </div>

        {/* Season & Episode for TV Shows */}
        {!isMovie && movieData?.last_episode_to_air && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-blue-500/20 border border-blue-400 text-blue-300 px-2 py-1 rounded text-xs font-normal">
              Phần {movieData.last_episode_to_air.season_number}
            </span>
            <span className="bg-blue-500/20 border border-blue-400 text-blue-300 px-2 py-1 rounded text-xs font-normal">
              Tập {movieData.last_episode_to_air.episode_number}
            </span>
          </div>
        )}
      </div>

      {/* Genres - Style như Banner */}
      {movieData?.genres && movieData.genres.length > 0 && (
        <div className="mb-6 text-left">
          <div className="flex flex-wrap gap-2">
            {movieData.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Overview */}
      {movieData?.overview && (
        <div className="mb-6 text-left">
          <h3 className="text-yellow-400 font-semibold mb-2">Giới thiệu:</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {movieData.overview}
          </p>
        </div>
      )}

      {/* Additional Info */}
      <div className="space-y-4 text-sm text-left">
        {/* Runtime */}
        {runtime && (
          <div>
            <h4 className="text-yellow-400 font-semibold mb-1">Thời lượng:</h4>
            <p className="text-gray-300">{formatRuntime(runtime)}</p>
          </div>
        )}

        {/* Country */}
        {movieData?.origin_country && movieData.origin_country.length > 0 && (
          <div>
            <h4 className="text-yellow-400 font-semibold mb-1">Quốc gia:</h4>
            <p className="text-gray-300">
              {movieData.origin_country
                .map((code) => getCountryName(code))
                .join(", ")}
            </p>
          </div>
        )}

        {/* Production Companies */}
        {movieData?.production_companies &&
          movieData.production_companies.length > 0 && (
            <div>
              <h4 className="text-yellow-400 font-semibold mb-1">Sản xuất:</h4>
              <p className="text-gray-300">
                {movieData.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </p>
            </div>
          )}

        {/* Director */}
        {getDirector() && (
          <div>
            <h4 className="text-yellow-400 font-semibold mb-1">Đạo diễn:</h4>
            <p className="text-gray-300">{getDirector()}</p>
          </div>
        )}

        {/* Cast */}
        {getMainCast().length > 0 && (
          <div>
            <h4 className="text-yellow-400 font-semibold mb-2">Diễn viên:</h4>
            <div className="space-y-2">
              {getMainCast().map((actor) => (
                <div key={actor.id} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
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
                    <p className="font-medium text-white text-xs truncate">
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
  );
};

export default MovieInfo;
