import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TiMediaPlay } from "react-icons/ti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FaBarsProgress } from "react-icons/fa6";

const EpisodeTab = ({ movieData, seasons, isMovie, movieId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastScrollPosition = useRef(0);

  // Get initial season
  const getCurrentSeason = () => {
    if (!seasons?.length) return 1;
    if (movieData?.last_episode_to_air?.season_number) {
      return movieData.last_episode_to_air.season_number;
    }
    return Math.max(...seasons.map((s) => s.season_number));
  };

  const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason());

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
        scrollContainerRef.current.scrollTop = lastScrollPosition.current;
      }, 10);
    }
  }, [isDropdownOpen]);

  // Movie rendering
  if (isMovie) {
    const isReleased = movieData?.release_date
      ? new Date(movieData.release_date) <= new Date()
      : false;

    return (
      <div className="episode-tab-container">
        <h3 className="text-white text-lg font-medium mb-4 text-left">
          Các bản chiếu
        </h3>
        <div className="episodes-grid grid grid-cols-6 gap-4">
          <Link
            to={`/watch/movie/${movieId}`}
            className="group bg-gray-800 hover:bg-gray-700 rounded-md px-1 py-3 text-center transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-yellow-400"
          >
            <div className="flex items-center justify-center gap-1">
              <TiMediaPlay className="text-white text-xl group-hover:text-yellow-400 transition-colors duration-300" />
              <span className="text-white text-sm font-normal group-hover:text-yellow-400 transition-colors duration-300">
                {isReleased ? "Xem full" : "Xem Trailer"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // TV Series logic
  if (!seasons?.length) {
    return (
      <div className="episode-tab-container">
        <p className="text-gray-400">Chưa có thông tin về các tập phim.</p>
      </div>
    );
  }

  const currentSeason =
    seasons.find((season) => season.season_number === selectedSeason) ||
    seasons[0];

  // Get episodes to show
  const getEpisodesToShow = () => {
    if (!currentSeason) return [];

    const isCurrentSeason =
      movieData?.last_episode_to_air &&
      currentSeason.season_number ===
        movieData.last_episode_to_air.season_number;

    const episodeCount = isCurrentSeason
      ? movieData.last_episode_to_air.episode_number
      : currentSeason.episode_count;

    return Array.from({ length: episodeCount }, (_, index) => ({
      episode_number: index + 1,
      name: `Tập ${index + 1}`,
    }));
  };

  const episodes = getEpisodesToShow();

  const handleSeasonSelect = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    if (scrollContainerRef.current) {
      lastScrollPosition.current = scrollContainerRef.current.scrollTop;
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="episode-tab-container">
      {/* Season Dropdown */}
      <div className="season-selector mb-3 flex justify-start">
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="group bg-transparent text-white font-semibold px-4 py-2 pr-8 rounded-lg focus:outline-none transition-colors cursor-pointer text-lg flex items-center gap-2 hover:text-yellow-400"
          >
            <FaBarsProgress className="text-white text-lg group-hover:text-yellow-400 transition-colors" />
            <span className="transition-colors">Phần {selectedSeason}</span>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`text-white text-sm transition-all duration-200 group-hover:text-yellow-400 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
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
                    onClick={() => handleSeasonSelect(season.season_number)}
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
