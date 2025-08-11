import React from "react";
import useMovieDetail from "../../../hooks/useMovieDetail";

const MovieInfo = () => {
  const {
    movieData,
    certification,
    loading,
    isMovie,
    getDirectors,
    getMainCast,
    formatRuntime,
    formatReleaseDate,
    getProductionCompanies,
    getOriginCountries,
    getPosterUrl,
    getTitle,
    getOverview,
    getRating,
    getLastEpisode
  } = useMovieDetail();

  if (loading) {
    return (
      <div className="w-full max-w-sm animate-pulse">
        <div className="aspect-[2/3] bg-gray-700 rounded-lg mb-4" />
        <div className="space-y-3">
          <div className="h-6 bg-gray-700 rounded" />
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-20 bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (!movieData?.vi && !movieData?.en) {
    return <div className="text-white">Không tìm thấy thông tin phim</div>;
  }

  const data = movieData.vi || movieData.en;
  const titles = getTitle();
  const posterUrl = getPosterUrl();
  const overview = getOverview();
  const rating = getRating();
  const releaseYear = formatReleaseDate();
  const directors = getDirectors();
  const cast = getMainCast();
  const productionCompanies = getProductionCompanies();
  const originCountries = getOriginCountries();
  const lastEpisode = getLastEpisode();

  return (
    <div className="text-white space-y-6">
      {/* Poster */}
      <div className="aspect-[2/3] w-full max-w-sm">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={titles.vi || titles.en}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Không có poster</span>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            {titles.vi || titles.en}
          </h1>
          {titles.vi && titles.en && titles.vi !== titles.en && (
            <h2 className="text-lg font-medium text-gray-300 mt-1">
              {titles.en}
            </h2>
          )}
        </div>

        {/* Rating, Certification, Year, Runtime/Episodes */}
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-yellow-600 px-2 py-1 rounded">
            ⭐ {rating}
          </span>
          <span className="bg-gray-700 px-2 py-1 rounded">
            {certification}
          </span>
          <span className="bg-gray-700 px-2 py-1 rounded">
            {releaseYear}
          </span>
          {isMovie ? (
            <span className="bg-gray-700 px-2 py-1 rounded">
              {formatRuntime(data?.runtime)}
            </span>
          ) : (
            lastEpisode && (
              <>
                <span className="bg-gray-700 px-2 py-1 rounded">
                  Season {lastEpisode.season_number}
                </span>
                <span className="bg-gray-700 px-2 py-1 rounded">
                  Tập {lastEpisode.episode_number}
                </span>
              </>
            )
          )}
        </div>

        {/* Overview */}
        {overview && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">
              {overview}
            </p>
          </div>
        )}

        {/* Runtime for TV shows */}
        {!isMovie && data?.episode_run_time?.[0] && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Thời lượng</h3>
            <p className="text-gray-300 text-sm">
              {data.episode_run_time[0]}m/tập
            </p>
          </div>
        )}

        {/* Countries */}
        {originCountries.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Quốc gia</h3>
            <p className="text-gray-300 text-sm">
              {isMovie 
                ? originCountries.map(country => country.name).join(", ")
                : originCountries.join(", ")
              }
            </p>
          </div>
        )}

        {/* Production Companies */}
        {productionCompanies.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Sản xuất</h3>
            <p className="text-gray-300 text-sm">
              {productionCompanies.map(company => company.name).join(", ")}
            </p>
          </div>
        )}

        {/* Directors */}
        {directors.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Đạo diễn</h3>
            <p className="text-gray-300 text-sm">
              {directors.map(director => director.name).join(", ")}
            </p>
          </div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Diễn viên</h3>
            <p className="text-gray-300 text-sm">
              {cast.map(actor => actor.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
