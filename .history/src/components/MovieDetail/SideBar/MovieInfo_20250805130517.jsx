const MovieInfo = ({
  movieData,
  mediaType,
  posterUrl,
  getCertification,
  formatRuntime,
  formatReleaseYear,
  getDirectors,
  getCast,
  getTitle,
  getOverview,
  getOriginCountries,
  getProductionCompanies,
  getLastEpisode,
}) => {
  if (!movieData.vi && !movieData.en) {
    return (
      <div className="w-80 bg-gray-800 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="w-full h-96 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const titles = getTitle();
  const overview = getOverview();
  const directors = getDirectors();
  const cast = getCast();
  const originCountries = getOriginCountries();
  const productionCompanies = getProductionCompanies();
  const lastEpisode = getLastEpisode();
  const certification = getCertification();

  // Get runtime based on media type
  const runtime =
    mediaType === "movie"
      ? movieData.vi?.runtime || movieData.en?.runtime
      : movieData.vi?.episode_run_time?.[0] ||
        movieData.en?.episode_run_time?.[0];

  // Get release date
  const releaseDate =
    mediaType === "movie"
      ? movieData.vi?.release_date || movieData.en?.release_date
      : movieData.vi?.first_air_date || movieData.en?.first_air_date;

  // Get vote average
  const voteAverage = movieData.vi?.vote_average || movieData.en?.vote_average;

  return (
    <div className="w-80 bg-gray-800 rounded-lg p-6 space-y-4 text-white">
      {/* Poster */}
      <div className="w-full">
        <img
          src={posterUrl || "/placeholder-poster.jpg"}
          alt={titles.display}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Titles */}
      <div className="space-y-1">
        {titles.vi && (
          <h1 className="text-white font-bold text-xl leading-tight">
            {titles.vi}
          </h1>
        )}
        {titles.en && (!titles.vi || titles.en !== titles.vi) && (
          <h2 className="text-gray-300 font-medium text-lg leading-tight">
            {titles.en}
          </h2>
        )}
      </div>

      {/* Rating and Info */}
      <div className="flex flex-wrap gap-2">
        {voteAverage && (
          <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-normal">
            TMDB {voteAverage.toFixed(1)}
          </span>
        )}

        <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-black px-2 py-1 rounded text-xs font-medium">
          {certification}
        </span>

        {releaseDate && (
          <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
            {formatReleaseYear(releaseDate)}
          </span>
        )}

        {mediaType === "tv" && lastEpisode && (
          <>
            <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
              Phần {lastEpisode.season_number}
            </span>
            <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
              Tập {lastEpisode.episode_number}
            </span>
          </>
        )}

        {runtime && (
          <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
            {formatRuntime(runtime)}
          </span>
        )}
      </div>

      {/* Overview */}
      {overview && (
        <div>
          <h3 className="text-white font-semibold mb-2">Giới thiệu:</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{overview}</p>
        </div>
      )}

      {/* Origin Countries */}
      {originCountries.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">Quốc gia:</h3>
          <p className="text-gray-300 text-sm">{originCountries.join(", ")}</p>
        </div>
      )}

      {/* Production Companies */}
      {productionCompanies.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">Sản xuất:</h3>
          <p className="text-gray-300 text-sm">
            {productionCompanies.map((company) => company.name).join(", ")}
          </p>
        </div>
      )}

      {/* Directors */}
      {directors.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">Đạo diễn:</h3>
          <p className="text-gray-300 text-sm">
            {directors.map((director) => director.name).join(", ")}
          </p>
        </div>
      )}

      {/* Cast */}
      {cast.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">Diễn viên:</h3>
          <p className="text-gray-300 text-sm">
            {cast.map((actor) => actor.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
