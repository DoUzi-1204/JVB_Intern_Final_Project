import React, { useState } from "react";
import { Link } from "react-router-dom";

const EpisodeTab = ({ movieData, seasons, isMovie, movieId }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  if (isMovie) {
    // Movie Logic
    const isReleased = movieData?.release_date
      ? new Date(movieData.release_date) <= new Date()
      : false;

    return (
      <div className="episode-tab-container">
        <h3 className="text-xl font-bold text-yellow-400 mb-6">
          Các bản chiếu
        </h3>

        <div className="movie-watch-section">
          <Link
            to={`/watch/movie/${movieId}`}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              isReleased
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <span className="mr-2">{isReleased ? "▶️" : "🎬"}</span>
            {isReleased ? "Xem full" : "Xem Trailer"}
          </Link>

          <div className="mt-4 text-gray-400 text-sm">
            {isReleased
              ? "Phim đã được phát hành, xem ngay!"
              : "Phim chưa được phát hành, xem trailer trước."}
          </div>
        </div>
      </div>
    );
  }

  // TV Series Logic
  if (!seasons || seasons.length === 0) {
    return (
      <div className="episode-tab-container">
        <h3 className="text-xl font-bold text-yellow-400 mb-6">Tập phim</h3>
        <p className="text-gray-400">Chưa có thông tin về các tập phim.</p>
      </div>
    );
  }

  // Get current season info from movieData
  const currentSeasonNumber = movieData?.last_episode_to_air?.season_number || movieData?.number_of_seasons || 1;
  const currentEpisodeNumber = movieData?.last_episode_to_air?.episode_number || 1;
  
  // Set default selected season to current season
  if (selectedSeason === 1 && currentSeasonNumber !== 1) {
    setSelectedSeason(currentSeasonNumber);
  }

  const currentSeason =
    seasons.find((season) => season.season_number === selectedSeason) ||
    seasons[0];

  // For current season, only show episodes up to current episode
  // For past seasons, show all episodes
  const generateEpisodes = (season) => {
    const episodeCount = season.episode_count;
    let maxEpisodes = episodeCount;
    
    // If this is the current season, only show up to current episode
    if (season.season_number === currentSeasonNumber) {
      maxEpisodes = currentEpisodeNumber;
    }
    
    return Array.from({ length: maxEpisodes }, (_, index) => ({
      episode_number: index + 1,
      name: `Tập ${index + 1}`,
      is_current: season.season_number === currentSeasonNumber && (index + 1) === currentEpisodeNumber,
    }));
  };

  const episodes = currentSeason ? generateEpisodes(currentSeason) : [];

  return (
    <div className="episode-tab-container">
      <h3 className="text-xl font-bold text-yellow-400 mb-6">Tập phim</h3>

      {/* Current Episode Info */}
      {movieData?.last_episode_to_air && (
        <div className="current-episode-info mb-6 p-4 bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 rounded-lg border border-yellow-400/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 text-lg">📺</span>
            <h4 className="text-yellow-400 font-semibold">Tập mới nhất</h4>
          </div>
          <div className="text-white">
            <span className="font-medium">
              Phần {currentSeasonNumber} - Tập {currentEpisodeNumber}
            </span>
            {movieData.last_episode_to_air.name && (
              <span className="text-gray-300 ml-2">
                "{movieData.last_episode_to_air.name}"
              </span>
            )}
          </div>
          {movieData.last_episode_to_air.air_date && (
            <div className="text-gray-400 text-sm mt-1">
              Phát sóng: {new Date(movieData.last_episode_to_air.air_date).toLocaleDateString('vi-VN')}
            </div>
          )}
        </div>
      )}

      {/* Season Dropdown */}
      <div className="season-selector mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Chọn phần:
        </label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
          className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
        >
          {seasons.map((season) => (
            <option key={season.season_number} value={season.season_number}>
              {season.name || `Phần ${season.season_number}`} (
              {season.season_number === currentSeasonNumber 
                ? `${currentEpisodeNumber}/${season.episode_count} tập`
                : `${season.episode_count} tập`
              })
              {season.season_number === currentSeasonNumber && ' - Đang phát sóng'}
            </option>
          ))}
        </select>
      </div>

      {/* Episodes Grid */}
      <div className="episodes-grid grid grid-cols-6 gap-4">
        {episodes.map((episode) => (
          <Link
            key={episode.episode_number}
            to={`/watch/tv/${movieId}/${selectedSeason}/${episode.episode_number}`}
            className={`episode-card rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 border ${
              episode.is_current 
                ? 'bg-yellow-900/30 border-yellow-400 hover:bg-yellow-800/40' 
                : 'bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-yellow-400'
            }`}
          >
            <div className={`episode-number font-bold text-lg mb-2 ${
              episode.is_current ? 'text-yellow-300' : 'text-yellow-400'
            }`}>
              {episode.episode_number}
              {episode.is_current && (
                <span className="block text-xs text-yellow-300 mt-1">Mới nhất</span>
              )}
            </div>
            <div className="episode-title text-white text-sm">
              Tập {episode.episode_number}
            </div>
          </Link>
        ))}
      </div>
              {episode.episode_number}
            </div>
            <div className="episode-title text-white text-sm">
              Tập {episode.episode_number}
            </div>
          </Link>
        ))}
      </div>

      {/* Season Info */}
      {currentSeason && (
        <div className="season-info mt-6 p-4 bg-gray-800 rounded-lg">
          <h4 className="text-yellow-400 font-semibold mb-2">
            {currentSeason.name || `Phần ${currentSeason.season_number}`}
          </h4>
          {currentSeason.overview && (
            <p className="text-gray-300 text-sm">{currentSeason.overview}</p>
          )}
          <div className="mt-2 text-gray-400 text-xs">
            Số tập: {currentSeason.episode_count} |
            {currentSeason.air_date &&
              ` Phát sóng: ${new Date(currentSeason.air_date).getFullYear()}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeTab;
