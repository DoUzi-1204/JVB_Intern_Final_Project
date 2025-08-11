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

  const data = movieData.vi || movieData.en;
  const titles = getTitle();
  const overview = getOverview();
  const directors = getDirectors();
  const cast = getCast();
  const certification = getCertification();
  const releaseYear = formatReleaseYear(
    data[mediaType === "movie" ? "release_date" : "first_air_date"]
  );

  // Get runtime based on media type
  const runtime =
    mediaType === "movie"
      ? formatRuntime(data.runtime)
      : formatRuntime(data.episode_run_time?.[0]);

  // Get countries
  const countries =
    data.origin_country || data.production_countries?.map((c) => c.name) || [];
  const countryText = Array.isArray(countries)
    ? countries.join(", ")
    : countries;

  // Get production companies
  const productionCompanies =
    data.production_companies
      ?.slice(0, 3)
      .map((c) => c.name)
      .join(", ") || "";

  // Get season and episode info for TV shows
  const seasonInfo =
    mediaType === "tv" && data.last_episode_to_air
      ? {
          season: data.last_episode_to_air.season_number,
          episode: data.last_episode_to_air.episode_number,
        }
      : null;

  return (
    <div className="w-80 bg-gray-800 rounded-lg p-6 space-y-4">
      {/* Poster */}
      <div className="w-full">
        <img
          src={posterUrl || "/placeholder-poster.jpg"}
          alt={titles.vi || titles.en}
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
        {titles.en && titles.en !== titles.vi && (
          <h2 className="text-gray-300 font-medium text-lg leading-tight">
            {titles.en}
          </h2>
        )}
      </div>

      {/* Rating, Certification, Year, Runtime/Season Info */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 rounded text-xs font-medium">
          TMDB {data.vote_average?.toFixed(1) || "N/A"}
        </span>

        <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-black px-2 py-1 rounded text-xs font-medium">
          {certification}
        </span>

        <span className="bg-white/10 border border-white text-white px-2 py-1 rounded text-xs">
          {releaseYear}
        </span>

        {mediaType === "movie" && runtime && (
          <span className="bg-white/10 border border-white text-white px-2 py-1 rounded text-xs">
            {runtime}
          </span>
        )}

        {mediaType === "tv" && seasonInfo && (
          <>
            <span className="bg-white/10 border border-white text-white px-2 py-1 rounded text-xs">
              Phần {seasonInfo.season}
            </span>
            <span className="bg-white/10 border border-white text-white px-2 py-1 rounded text-xs">
              Tập {seasonInfo.episode}
            </span>
          </>
        )}
      </div>

      {/* Overview */}
      {overview && (
        <div>
          <h3 className="text-white font-semibold mb-2">Giới thiệu:</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{overview}</p>
        </div>
      )}

      {/* Runtime for TV shows */}
      {mediaType === "tv" && runtime && (
        <div>
          <h3 className="text-white font-semibold mb-1">Thời lượng:</h3>
          <p className="text-gray-300 text-sm">{runtime}</p>
        </div>
      )}

      {/* Countries */}
      {countryText && (
        <div>
          <h3 className="text-white font-semibold mb-1">Quốc gia:</h3>
          <p className="text-gray-300 text-sm">{countryText}</p>
        </div>
      )}

      {/* Production Companies */}
      {productionCompanies && (
        <div>
          <h3 className="text-white font-semibold mb-1">Sản xuất:</h3>
          <p className="text-gray-300 text-sm">{productionCompanies}</p>
        </div>
      )}

      {/* Directors */}
      {directors.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-1">Đạo diễn:</h3>
          <p className="text-gray-300 text-sm">
            {directors.map((d) => d.name).join(", ")}
          </p>
        </div>
      )}

      {/* Cast */}
      {cast.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">Diễn viên:</h3>
          <div className="space-y-1">
            {cast.slice(0, 5).map((actor) => (
              <p key={actor.id} className="text-gray-300 text-sm">
                {actor.name}
                {actor.character && (
                  <span className="text-gray-400"> - {actor.character}</span>
                )}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
