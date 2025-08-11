import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TiMediaPlay } from "react-icons/ti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const EpisodeTab = ({ movieData, seasons, isMovie, movieId }) => {
  // Set initial season to current season or latest available season
  const getCurrentSeason = () => {
    if (!seasons || seasons.length === 0) return 1;

    // If there's last_episode_to_air, use that season
    if (movieData?.last_episode_to_air?.season_number) {
      return movieData.last_episode_to_air.season_number;
    }

    // Otherwise use the latest season
    return Math.max(...seasons.map((s) => s.season_number));
  };

  const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastScrollPosition = useRef(0);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Save scroll position before closing
        if (scrollContainerRef.current) {
          lastScrollPosition.current = scrollContainerRef.current.scrollTop;
        }
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Restore scroll position when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = lastScrollPosition.current;
        }
      }, 10);
    }
  }, [isDropdownOpen]);

  if (isMovie) {
    // Movie Logic
    const isReleased = movieData?.release_date
      ? new Date(movieData.release_date) <= new Date()
      : false;

    return (
      <div className="episode-tab-container">
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

    // For current season, show episodes up to the last aired episode
    if (
      movieData?.last_episode_to_air &&
      currentSeason.season_number ===
        movieData.last_episode_to_air.season_number
    ) {
      const lastEpisode = movieData.last_episode_to_air.episode_number;
      return Array.from({ length: lastEpisode }, (_, index) => ({
        episode_number: index + 1,
        name: `Tập ${index + 1}`,
      }));
    }

    // For completed seasons, show all episodes
    return Array.from({ length: currentSeason.episode_count }, (_, index) => ({
      episode_number: index + 1,
      name: `Tập ${index + 1}`,
    }));
  };

  const episodes = getEpisodesToShow();

  return (
    <div className="episode-tab-container">
      {/* Season Dropdown */}
      <div className="season-selector mb-6 flex justify-start">
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="group bg-transparent text-white font-semibold px-4 py-2 pr-8 rounded-lg focus:outline-none transition-colors cursor-pointer text-lg flex items-center gap-2 hover:text-yellow-400"
          >
            <span className="transition-colors">Phần {selectedSeason}</span>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`text-white text-sm transition-all duration-200 group-hover:text-yellow-400 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Custom Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-500 text-black text-sm font-medium">
                Danh sách phần
              </div>
              <div
                className="max-h-40 overflow-y-auto"
                ref={scrollContainerRef}
                onScroll={(e) => {
                  lastScrollPosition.current = e.target.scrollTop;
                }}
              >
                {seasons.map((season) => (
                  <button
                    key={season.season_number}
                    onClick={() => {
                      setSelectedSeason(season.season_number);
                      // Save scroll position before closing
                      if (scrollContainerRef.current) {
                        lastScrollPosition.current =
                          scrollContainerRef.current.scrollTop;
                      }
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      selectedSeason === season.season_number
                        ? "bg-orange-300 text-black font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    Phần {season.season_number}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="episodes-grid grid grid-cols-6 gap-4">
        {episodes.map((episode) => (
          <Link
            key={episode.episode_number}
            to={`/watch/tv/${movieId}/${selectedSeason}/${episode.episode_number}`}
            className="group bg-gray-800 hover:bg-gray-700 rounded-md px-4 py-3 text-center transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-yellow-400"
          >
            <div className="flex items-center justify-center gap-1">
              <TiMediaPlay className="text-white text-xl group-hover:text-yellow-400 transition-colors duration-300" />
              <span className="text-white text-sm font-normal group-hover:text-yellow-400 transition-colors duration-300">
                Tập {episode.episode_number}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTab;
