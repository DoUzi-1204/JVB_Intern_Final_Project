import React from 'react';
import { FaStar, FaCalendarAlt } from 'react-icons/fa';

const VideoInfo = ({ movieData, isMovie }) => {
  if (!movieData) return <div>Loading...</div>;

  const formatRuntime = (runtime) => {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const getReleaseYear = () => {
    const date = isMovie ? movieData.release_date : movieData.first_air_date;
    return date ? new Date(date).getFullYear() : 'N/A';
  };

  const getTitle = (lang = 'vi') => {
    if (lang === 'vi') {
      return isMovie 
        ? movieData.title_vi || movieData.title 
        : movieData.name_vi || movieData.name;
    }
    return isMovie ? movieData.original_title : movieData.original_name;
  };

  const getGenres = () => {
    return movieData.genres?.map(genre => genre.name).join(', ') || 'N/A';
  };

  const getCertification = () => {
    if (!movieData.certifications) return "NR";
    
    if (isMovie) {
      const usRelease = movieData.certifications.results?.find(
        (release) => release.iso_3166_1 === "US"
      );
      if (usRelease && usRelease.release_dates?.length > 0) {
        return usRelease.release_dates[0].certification || "NR";
      }
    } else {
      const usRating = movieData.certifications.results?.find(
        (rating) => rating.iso_3166_1 === "US"
      );
      if (usRating) {
        return usRating.rating || "NR";
      }
    }
    return "NR";
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-6">
      <div className="flex space-x-6">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={movieData.poster_path 
              ? `https://image.tmdb.org/t/p/w300${movieData.poster_path}`
              : '/placeholder-poster.jpg'
            }
            alt={getTitle()}
            className="w-32 h-48 object-cover rounded-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1">
          <div className="space-y-4 text-left">
            {/* Titles */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {getTitle('vi')}
              </h2>
              <h3 className="text-lg text-yellow-300 font-light">
                {getTitle('en')}
              </h3>
            </div>

            {/* Movie Info Pills - Similar to Banner */}
            <div className="flex items-center space-x-2">
              {/* TMDB Rating */}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-normal backdrop-blur-sm">
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
                    Phần {movieData.last_episode_to_air.season_number} - Tập {movieData.last_episode_to_air.episode_number}
                  </span>
                )
              )}
            </div>

            {/* Genres */}
            {movieData.genres && movieData.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movieData.genres.slice(0, 5).map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700/50 text-white px-3 py-1 rounded-full text-xs border border-gray-600"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Overview */}
        <div className="flex-1">
          <h4 className="text-yellow-400 font-medium mb-3 text-left">Tóm tắt</h4>
          <p className="text-gray-300 text-sm leading-relaxed text-left">
            {movieData.overview || "Chưa có thông tin tóm tắt."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
