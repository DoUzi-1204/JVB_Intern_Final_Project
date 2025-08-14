import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { API_CONFIG } from "../utils/constants";
import useSearch from "../hooks/useSearch";

const AutoComplete = ({ className = "" }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const {
    query,
    results,
    loading,
    showDropdown,
    handleInputChange,
    clearSearch,
    hideDropdown,
    showSearchDropdown,
  } = useSearch();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        hideDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hideDropdown]);

  // Format runtime to hours and minutes
  const formatRuntime = (runtime) => {
    if (!runtime) return "";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  // Handle item click
  const handleItemClick = (item) => {
    const mediaType = item.media_type === "tv" ? "tv" : "movie";
    navigate(`/${mediaType}/${item.id}`);
    hideDropdown();
  };

  // Handle person click
  const handlePersonClick = (person) => {
    navigate(`/person/${person.id}`);
    hideDropdown();
  };

  // Handle "Show All" click
  const handleShowAll = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      hideDropdown();
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      handleShowAll();
    }
  };

  const totalResults = results.movies.length + results.tv.length;
  const displayMovies = results.movies.slice(0, 3);
  const displayTv = results.tv.slice(0, 3);

  // Filter people to show only actors, not directors, writers, etc.
  const actors = results.people.filter(
    (person) => person.known_for_department === "Acting"
  );
  const displayPeople = actors.slice(0, 4);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={showSearchDropdown}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm phim, diễn viên"
          className="w-full py-2.5 px-4 pr-12 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-white/70 outline-none focus:bg-white/15 focus:border-white/40 transition-all duration-300"
        />

        {/* Search Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Loading Dropdown */}
      {showDropdown && loading && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl z-50"
        >
          <div className="p-6 text-center">
            <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-400 text-sm">Đang tìm kiếm...</p>
          </div>

          {/* Show All Button - even during loading */}
          {query.trim() && (
            <div className="p-3 border-t border-gray-700">
              <button
                onClick={handleShowAll}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-300 hover:from-yellow-500 hover:to-orange-600 text-black font-medium text-sm py-2.5 px-4 rounded-md transition-all duration-200"
              >
                Tìm kiếm "{query}"
              </button>
            </div>
          )}
        </div>
      )}

      {/* Dropdown Results */}
      {showDropdown &&
        !loading &&
        (displayMovies.length > 0 ||
          displayTv.length > 0 ||
          displayPeople.length > 0) && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl z-50 flex flex-col"
            style={{ maxHeight: "400px" }}
          >
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Movies & TV Series */}
              {(displayMovies.length > 0 || displayTv.length > 0) && (
                <div className="p-3">
                  <h3 className="text-white font-medium text-sm mb-3 px-1">
                    Danh sách phim
                  </h3>
                  <div className="space-y-2">
                    {[...displayMovies, ...displayTv].map((item) => (
                      <div
                        key={`${item.media_type}-${item.id}`}
                        onClick={() => handleItemClick(item)}
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
                      >
                        {/* Poster - căn giữa với nội dung */}
                        <div className="flex-shrink-0 w-12 h-16 bg-gray-700 rounded overflow-hidden">
                          {item.poster_path ? (
                            <img
                              src={`${API_CONFIG.IMAGE_BASE_URL}/w92${item.poster_path}`}
                              alt={item.title_vi || item.title || item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                              📽️
                            </div>
                          )}
                        </div>

                        {/* Info - căn trái và căn giữa với poster */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center text-left">
                          {/* Vietnamese Title */}
                          <h4 className="text-white font-medium text-sm leading-tight mb-1 text-left">
                            {item.title_vi}
                          </h4>

                          {/* English Title */}
                          <p className="text-gray-400 text-xs leading-tight mb-2 text-left">
                            {item.title_en}
                          </p>

                          {/* Additional Info - giống PreviewCard */}
                          <div className="flex items-center gap-1 flex-wrap">
                            {/* TMDB Score - giống PreviewCard */}
                            {item.vote_average > 0 && (
                              <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-0.5 rounded text-xs font-normal">
                                TMDB {item.vote_average.toFixed(1)}
                              </span>
                            )}

                            {/* Movie: Year + Runtime */}
                            {item.media_type === "movie" && (
                              <>
                                {item.release_date && (
                                  <span className="bg-white/10 border border-white/50 text-white text-xs px-2 py-0.5 rounded">
                                    {new Date(item.release_date).getFullYear()}
                                  </span>
                                )}
                                {item.runtime && (
                                  <span className="bg-white/10 border border-white/50 text-white text-xs px-2 py-0.5 rounded">
                                    {formatRuntime(item.runtime)}
                                  </span>
                                )}
                              </>
                            )}

                            {/* TV: Current Season + Episode */}
                            {item.media_type === "tv" && (
                              <>
                                {item.current_season && (
                                  <span className="bg-white/10 border border-white/50 text-white text-xs px-2 py-0.5 rounded">
                                    Phần {item.current_season}
                                  </span>
                                )}
                                {item.current_episode && (
                                  <span className="bg-white/10 border border-white/50 text-white text-xs px-2 py-0.5 rounded">
                                    Tập {item.current_episode}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* People */}
              {displayPeople.length > 0 && (
                <div className="p-3 border-t border-gray-700">
                  <h3 className="text-white font-medium text-sm mb-3 px-1">
                    Danh sách diễn viên
                  </h3>
                  <div className="space-y-2">
                    {displayPeople.map((person) => (
                      <div
                        key={`person-${person.id}`}
                        onClick={() => handlePersonClick(person)}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
                      >
                        {/* Profile Image */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                          {person.profile_path ? (
                            <img
                              src={`${API_CONFIG.IMAGE_BASE_URL}/w92${person.profile_path}`}
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                              👤
                            </div>
                          )}
                        </div>

                        {/* Name - căn trái */}
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-white font-medium text-sm leading-tight text-left">
                            {person.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fixed Show All Button - Outside scroll area */}
            {query.trim() && (
              <div className="p-3 border-t border-gray-700 bg-gray-900/95 rounded-b-lg flex-shrink-0">
                <button
                  onClick={handleShowAll}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-300 hover:from-yellow-500 hover:to-orange-600 text-black font-medium text-sm py-2.5 px-4 rounded-md transition-all duration-200"
                >
                  {results.total > 0
                    ? "Hiển thị toàn bộ"
                    : `Tìm kiếm "${query}"`}
                </button>
              </div>
            )}
          </div>
        )}

      {/* No Results */}
      {showDropdown &&
        !loading &&
        query.trim() &&
        totalResults === 0 &&
        displayPeople.length === 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl z-50"
          >
            <div className="p-4">
              <p className="text-gray-400 text-center text-sm">
                Không tìm thấy kết quả cho "{query}"
              </p>
            </div>

            {/* Show All Button - even when no results */}
            {query.trim() && (
              <div className="p-3 border-t border-gray-700">
                <button
                  onClick={handleShowAll}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-300 hover:from-yellow-500 hover:to-orange-600 text-black font-medium text-sm py-2.5 px-4 rounded-md transition-all duration-200"
                >
                  Tìm kiếm "{query}"
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default AutoComplete;
