import { FaStar } from 'react-icons/fa';
import useMovieDetail from '../../../hooks/useMovieDetail';

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
    getOriginCountries
  } = useMovieDetail();

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 animate-pulse">
        <div className="w-full h-96 bg-gray-800 rounded-lg mb-4"></div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          <div className="h-20 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!movieData) return null;

  const posterUrl = movieData.poster_path
    ? `${IMAGE_BASE_URL}/w500${movieData.poster_path}`
    : '/placeholder-poster.jpg';

  const titleVi = movieData.title || movieData.name || '';
  const titleEn = movieData.title_en || movieData.original_title || movieData.original_name || '';
  
  // Use Vietnamese title if available, otherwise use English
  const primaryTitle = titleVi || titleEn;
  const secondaryTitle = titleVi && titleVi !== titleEn ? titleEn : '';

  const voteAverage = movieData.vote_average ? movieData.vote_average.toFixed(1) : 'N/A';
  const releaseYear = formatReleaseDate(movieData.release_date || movieData.first_air_date);
  const runtime = formatRuntime(movieData.runtime || movieData.episode_run_time?.[0]);

  const directors = getDirectors();
  const mainCast = getMainCast();
  const productionCompanies = getProductionCompanies();
  const originCountries = getOriginCountries();

  // For TV shows, get current season and episode info
  const currentSeason = movieData.last_episode_to_air?.season_number;
  const currentEpisode = movieData.last_episode_to_air?.episode_number;

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 text-white">
      {/* Poster */}
      <div className="mb-6">
        <img
          src={posterUrl}
          alt={primaryTitle}
          className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Titles */}
      <div className="mb-4">
        {primaryTitle && (
          <h1 className="text-2xl font-bold mb-2 leading-tight">
            {primaryTitle}
          </h1>
        )}
        {secondaryTitle && (
          <h2 className="text-lg text-gray-300 font-medium leading-tight">
            {secondaryTitle}
          </h2>
        )}
      </div>

      {/* Rating, Certification, Year, Runtime/Season Info */}
      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
        {/* Rating */}
        <div className="flex items-center gap-1 bg-yellow-600 px-2 py-1 rounded">
          <FaStar className="text-yellow-300" />
          <span className="font-medium">{voteAverage}</span>
        </div>

        {/* Certification */}
        {certification && (
          <div className="bg-gray-700 px-2 py-1 rounded border border-gray-600">
            {certification}
          </div>
        )}

        {/* Release Year */}
        {releaseYear && (
          <div className="bg-gray-700 px-2 py-1 rounded">
            {releaseYear}
          </div>
        )}

        {/* Runtime for movies or Season/Episode for TV */}
        {isMovie ? (
          runtime && (
            <div className="bg-gray-700 px-2 py-1 rounded">
              {runtime}
            </div>
          )
        ) : (
          <>
            {currentSeason && (
              <div className="bg-gray-700 px-2 py-1 rounded">
                Phần {currentSeason}
              </div>
            )}
            {currentEpisode && (
              <div className="bg-gray-700 px-2 py-1 rounded">
                Tập {currentEpisode}
              </div>
            )}
          </>
        )}
      </div>

      {/* Overview */}
      {movieData.overview && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Giới thiệu phim</h3>
          <p className="text-gray-300 leading-relaxed">
            {movieData.overview}
          </p>
        </div>
      )}

      {/* Additional Info */}
      <div className="space-y-4">
        {/* Runtime */}
        {runtime && (
          <div>
            <h4 className="font-semibold mb-1">Thời lượng</h4>
            <p className="text-gray-300">{runtime}</p>
          </div>
        )}

        {/* Origin Countries */}
        {originCountries.length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">Quốc gia</h4>
            <p className="text-gray-300">{originCountries.join(', ')}</p>
          </div>
        )}

        {/* Production Companies */}
        {productionCompanies.length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">Sản xuất</h4>
            <p className="text-gray-300">
              {productionCompanies.map(company => company.name).join(', ')}
            </p>
          </div>
        )}

        {/* Directors */}
        {directors.length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">Đạo diễn</h4>
            <p className="text-gray-300">
              {directors.map(director => director.name).join(', ')}
            </p>
          </div>
        )}

        {/* Cast */}
        {mainCast.length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">Diễn viên</h4>
            <p className="text-gray-300">
              {mainCast.map(actor => actor.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;