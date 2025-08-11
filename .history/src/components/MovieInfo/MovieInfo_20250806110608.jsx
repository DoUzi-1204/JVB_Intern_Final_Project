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

  // Helper functions
  const formatRuntime = (runtime) => {
    if (!runtime) return "Đang cập nhật";

    if (isMovie) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    } else {
      return `${runtime} phút/tập`;
    }
  };

  const getDirector = () => {
    if (!credits?.crew) return "Đang cập nhật";
    const director = credits.crew.find((person) => person.job === "Director");
    return director?.name || "Đang cập nhật";
  };

  const posterUrl = movieData?.poster_path
    ? `${IMAGE_BASE_URL}/w500${movieData.poster_path}`
    : null;

  const titleVi = movieData?.title || movieData?.name || "";
  const titleEn = movieData?.titleEn || "";

  // Logic tên hiển thị - nếu không có tên tiếng Việt thì hiển thị cả 2 là tiếng Anh
  const displayTitleVi = titleVi || titleEn;
  const displayTitleEn = titleEn || titleVi;

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
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-7 text-white shadow-2xl">
      {/* Poster */}
      <div className="mb-7">
        {posterUrl && (
          <img
            src={posterUrl}
            alt={displayTitleVi}
            className="w-1/2 mx-auto rounded-lg shadow-xl"
          />
        )}
      </div>

      {/* Movie Titles */}
      <div className="mb-5 text-left">
        <h1 className="text-2xl font-semibold mb-1 leading-tight text-white">
          {displayTitleVi}
        </h1>
        <h2 className="text-base text-yellow-300 font-normal">
          {displayTitleEn}
        </h2>
      </div>

      {/* Meta Information */}
      <div className="mb-1 text-left">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Rating */}
          {movieData?.vote_average > 0 && (
            <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
              TMDB {movieData.vote_average.toFixed(1)}
            </span>
          )}

          {/* Certification giống style nút bên dưới */}
          <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-black px-2 py-1 rounded text-xs font-medium">
            {getCertification()}
          </span>

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

          {/* Season & Episode for TV Shows  */}
          {!isMovie && movieData?.last_episode_to_air && (
            <>
              <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
                Phần {movieData.last_episode_to_air.season_number}
              </span>
              <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
                Tập {movieData.last_episode_to_air.episode_number}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Genres - Style như Banner */}
      {movieData?.genres && movieData.genres.length > 0 && (
        <div className="mb-5 text-left">
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
        <div className="mb-5 text-left">
          <h3 className="text-white font-semibold mb-1">Giới thiệu:</h3>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            {movieData.overview}
          </p>
        </div>
      )}

      {/* Additional Info */}
      <div className="space-y-3 text-sm text-left">
        {/* Runtime */}
        <div className="flex items-start gap-2">
          <h4 className="text-white font-semibold flex-shrink-0">
            Thời lượng:
          </h4>
          <p className="text-gray-300 text-sm font-light break-words">
            {formatRuntime(runtime)}
          </p>
        </div>

        {/* Country */}
        <div className="flex items-start gap-2">
          <h4 className="text-white font-semibold flex-shrink-0">Quốc gia:</h4>
          <p className="text-gray-300 text-sm font-light break-words">
            {movieData?.origin_country && movieData.origin_country.length > 0
              ? movieData.origin_country
                  .map((code) => getCountryName(code))
                  .join(", ")
              : "Đang cập nhật"}
          </p>
        </div>

        {/* Production Companies */}
        <div className="flex items-start gap-2">
          <h4 className="text-white font-semibold flex-shrink-0">Sản xuất:</h4>
          <p className="text-gray-300 text-sm font-light break-words">
            {movieData?.production_companies &&
            movieData.production_companies.length > 0
              ? movieData.production_companies
                  .map((company) => company.name)
                  .join(", ")
              : "Đang cập nhật"}
          </p>
        </div>

        {/* Director */}
        <div className="flex items-start gap-2">
          <h4 className="text-white font-semibold flex-shrink-0">Đạo diễn:</h4>
          <p className="text-gray-300 text-sm font-light break-words">
            {getDirector()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
