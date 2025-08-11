import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EpisodeTab = ({ movieData, seasons, isMovie, movieId }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  if (isMovie) {
    // Movie Logic
    const isReleased = movieData?.release_date 
      ? new Date(movieData.release_date) <= new Date() 
      : false;

    return (
      <div className="episode-tab-container">
        <h3 className="text-xl font-bold text-yellow-400 mb-6">Các bản chiếu</h3>
        
        <div className="movie-watch-section">
          <Link 
            to={`/watch/movie/${movieId}`}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              isReleased 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <span className="mr-2">
              {isReleased ? '▶️' : '🎬'}
            </span>
            {isReleased ? 'Xem full' : 'Xem Trailer'}
          </Link>
          
          <div className="mt-4 text-gray-400 text-sm">
            {isReleased 
              ? 'Phim đã được phát hành, xem ngay!' 
              : 'Phim chưa được phát hành, xem trailer trước.'
            }
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

  const currentSeason = seasons.find(season => season.season_number === selectedSeason) || seasons[0];

  // Generate episodes based on episode_count
  const generateEpisodes = (episodeCount) => {
    return Array.from({ length: episodeCount }, (_, index) => ({
      episode_number: index + 1,
      name: `Tập ${index + 1}`,
    }));
  };

  const episodes = currentSeason ? generateEpisodes(currentSeason.episode_count) : [];

  return (
    <div className="episode-tab-container">
      <h3 className="text-xl font-bold text-yellow-400 mb-6">Tập phim</h3>
      
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
              {season.name || `Phần ${season.season_number}`} ({season.episode_count} tập)
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
            className="episode-card bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-yellow-400"
          >
            <div className="episode-number text-yellow-400 font-bold text-lg mb-2">
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
            {currentSeason.air_date && ` Phát sóng: ${new Date(currentSeason.air_date).getFullYear()}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeTab;
