const MovieInfo = ({ movieData, mediaType = "movie" }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  if (!movieData?.details) {
    return (
      <div className="w-full bg-gray-800 rounded-lg p-6 animate-pulse">
        <div className="w-full h-96 bg-gray-700 rounded-lg mb-4"></div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  const {
    details,
    detailsEn,
    certification,
    getTitle,
    getReleaseYear,
    formatRuntime,
    getOriginCountries,
    getProductionCompanies,
    getDirector,
    getMainCast,
    getLastEpisode,
  } = movieData;

  const posterUrl = details.poster_path
    ? `${IMAGE_BASE_URL}/w500${details.poster_path}`
    : "/placeholder-poster.jpg";

  const title = getTitle();
  const director = getDirector();
  const cast = getMainCast();
  const lastEpisode = getLastEpisode();
  const countries = getOriginCountries();
  const companies = getProductionCompanies();

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 text-white">
      {/* Poster */}
      <div className="w-full mb-6">
        <img
          src={posterUrl}
          alt={title.display}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Movie Titles */}
      <div className="mb-4">
        {title.vietnamese && (
          <h1 className="text-xl font-bold text-white mb-2 leading-tight">
            {title.vietnamese}
          </h1>
        )}
        {title.english && (
          <h2 className="text-lg font-medium text-gray-300 leading-tight">
            {title.english}
          </h2>
        )}
      </div>

      {/* Movie Info Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* TMDB Rating */}
        <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-normal">
          TMDB {details.vote_average?.toFixed(1)}
        </span>

        {/* Certification */}
        <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-black px-2 py-1 rounded text-xs font-medium">
          {certification}
        </span>

        {/* Release Year */}
        <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
          {getReleaseYear()}
        </span>

        {/* Runtime for movies or Season/Episode for TV shows */}
        {mediaType === "movie" ? (
          <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
            {formatRuntime(details.runtime)}
          </span>
        ) : (
          lastEpisode && (
            <>
              <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
                Phần {lastEpisode.season_number}
              </span>
              <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
                Tập {lastEpisode.episode_number}
              </span>
            </>
          )
        )}
      </div>

      {/* Overview */}
      {details.overview && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Giới thiệu phim</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {details.overview}
          </p>
        </div>
      )}

      {/* Additional Info */}
      <div className="space-y-3 text-sm">
        {/* Runtime */}
        <div>
          <span className="text-gray-400 font-medium">Thời lượng: </span>
          <span className="text-white">
            {formatRuntime(details.runtime || details.episode_run_time?.[0])}
          </span>
        </div>

        {/* Countries */}
        {countries.length > 0 && (
          <div>
            <span className="text-gray-400 font-medium">Quốc gia: </span>
            <span className="text-white">{countries.join(", ")}</span>
          </div>
        )}

        {/* Production Companies */}
        {companies.length > 0 && (
          <div>
            <span className="text-gray-400 font-medium">Sản xuất: </span>
            <span className="text-white">
              {companies.map((c) => c.name).join(", ")}
            </span>
          </div>
        )}

        {/* Director */}
        {director && (
          <div>
            <span className="text-gray-400 font-medium">Đạo diễn: </span>
            <span className="text-white">{director.name}</span>
          </div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <div>
            <span className="text-gray-400 font-medium">Diễn viên: </span>
            <span className="text-white">
              {cast.map((actor) => actor.name).join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
