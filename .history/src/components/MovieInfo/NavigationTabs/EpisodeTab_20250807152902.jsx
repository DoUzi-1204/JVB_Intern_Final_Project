import React, { useState } from "react";
import { Link } from "react-router-dom";

const EpisodeTab = ({ movieData, seasons, isMovie, movieId }) => {
  // Set initial season to current season or latest available season
  const getCurrentSeason = () => {
    if (!seasons || seasons.length === 0) return 1;
    
    // If there's last_episode_to_air, use that season
    if (movieData?.last_episode_to_air?.season_number) {
      return movieData.last_episode_to_air.season_number;
    }
    
    // Otherwise use the latest season
    return Math.max(...seasons.map(s => s.season_number));
  };

  const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason());

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

  const currentSeason =
    seasons.find((season) => season.season_number === selectedSeason) ||
    seasons[0];

  // Get episodes from the detailed season data
  const getEpisodesToShow = () => {
    if (!currentSeason) return [];
    
    // If we have detailed episodes data, use it
    if (currentSeason.episodes && currentSeason.episodes.length > 0) {
      return currentSeason.episodes;
    }
    
    // For current season, show episodes up to the last aired episode
    if (movieData?.last_episode_to_air && 
        currentSeason.season_number === movieData.last_episode_to_air.season_number) {
      const lastEpisode = movieData.last_episode_to_air.episode_number;
      return Array.from({ length: lastEpisode }, (_, index) => ({
        episode_number: index + 1,
        name: `Tập ${index + 1}`,
        air_date: null,
        overview: null
      }));
    }
    
    // For completed seasons, show all episodes
    return Array.from({ length: currentSeason.episode_count }, (_, index) => ({
      episode_number: index + 1,
      name: `Tập ${index + 1}`,
      air_date: null,
      overview: null
    }));
  };

  const episodes = getEpisodesToShow();

  return (
    <div className="episode-tab-container">
      <h3 className="text-xl font-bold text-yellow-400 mb-6">Tập phim</h3>

      {/* Current Episode Info */}
      {movieData?.last_episode_to_air && (
        <div className="current-episode-info mb-6 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-400/30">
          <h4 className="text-yellow-400 font-semibold mb-2">
            🔥 Tập mới nhất
          </h4>
          <div className="text-white">
            <span className="font-medium">
              Phần {movieData.last_episode_to_air.season_number} - Tập {movieData.last_episode_to_air.episode_number}
            </span>
            {movieData.last_episode_to_air.name && (
              <span className="ml-2 text-gray-300">
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
              {season.episode_count} tập)
            </option>
          ))}
        </select>
      </div>

      {/* Episodes Grid */}
      <div className="episodes-grid grid grid-cols-6 gap-4">
        {episodes.map((episode) => {
          // Check if this is the current episode
          const isCurrentEpisode = movieData?.last_episode_to_air && 
            selectedSeason === movieData.last_episode_to_air.season_number &&
            episode.episode_number === movieData.last_episode_to_air.episode_number;

          return (
            <Link
              key={episode.episode_number}
              to={`/watch/tv/${movieId}/${selectedSeason}/${episode.episode_number}`}
              className={`episode-card bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 border ${
                isCurrentEpisode 
                  ? 'border-yellow-400 bg-yellow-900/20' 
                  : 'border-gray-700 hover:border-yellow-400'
              }`}
            >
              <div className={`episode-number font-bold text-lg mb-2 ${
                isCurrentEpisode ? 'text-yellow-300' : 'text-yellow-400'
              }`}>
                {episode.episode_number}
                {isCurrentEpisode && <span className="ml-1">🔥</span>}
              </div>
              <div className="episode-title text-white text-sm">
                {episode.name || `Tập ${episode.episode_number}`}
              </div>
              {episode.air_date && (
                <div className="episode-date text-gray-400 text-xs mt-1">
                  {new Date(episode.air_date).toLocaleDateString('vi-VN')}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Season Info */}
      {currentSeason && (
        <div className="season-info mt-6 p-4 bg-gray-800 rounded-lg">
          <h4 className="text-yellow-400 font-semibold mb-2">
            {currentSeason.name || `Phần ${currentSeason.season_number}`}
          </h4>
          {currentSeason.overview && (
            <p className="text-gray-300 text-sm mb-3">{currentSeason.overview}</p>
          )}
          <div className="mt-2 text-gray-400 text-xs flex flex-wrap gap-4">
            <span>Số tập: {episodes.length}/{currentSeason.episode_count}</span>
            {currentSeason.air_date && (
              <span>Phát sóng: {new Date(currentSeason.air_date).getFullYear()}</span>
            )}
            {movieData?.last_episode_to_air && 
             selectedSeason === movieData.last_episode_to_air.season_number && (
              <span className="text-yellow-400">
                Tập mới nhất: {movieData.last_episode_to_air.episode_number}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeTab;
