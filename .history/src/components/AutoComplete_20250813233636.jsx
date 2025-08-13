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
    showSearchDropdown
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
  const displayPeople = results.people.slice(0, 4);

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
        
        {/* Loading Indicator */}
        {loading && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && (displayMovies.length > 0 || displayTv.length > 0 || displayPeople.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
        >
          {/* Movies & TV Series */}
          {(displayMovies.length > 0 || displayTv.length > 0) && (
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-medium text-sm mb-3">Danh sách phim</h3>
              <div className="space-y-3">
                {[...displayMovies, ...displayTv].map((item) => (
                  <div
                    key={`${item.media_type}-${item.id}`}
                    onClick={() => handleItemClick(item)}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                  >
                    {/* Poster */}
                    <div className="flex-shrink-0 w-12 h-16 bg-gray-700 rounded overflow-hidden">
                      {item.poster_path ? (
                        <img
                          src={`${API_CONFIG.IMAGE_BASE_URL}/w92${item.poster_path}`}
                          alt={item.title_vi || item.title || item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      {/* Vietnamese Title */}
                      <h4 className="text-white font-medium text-sm truncate">
                        {item.title_vi || item.title || item.name}
                      </h4>
                      
                      {/* English Title */}
                      <p className="text-gray-400 text-xs truncate mt-1">
                        {item.title_en || item.title || item.name}
                      </p>
                      
                      {/* Additional Info */}
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        {/* TMDB Score */}
                        {item.vote_average > 0 && (
                          <span className="text-yellow-500">
                            ★ {item.vote_average.toFixed(1)}
                          </span>
                        )}
                        
                        {/* Movie: Year + Runtime */}
                        {item.media_type === "movie" && (
                          <>
                            {item.release_date && (
                              <span>{new Date(item.release_date).getFullYear()}</span>
                            )}
                            {item.runtime && (
                              <span>{formatRuntime(item.runtime)}</span>
                            )}
                          </>
                        )}
                        
                        {/* TV: Seasons + Episodes */}
                        {item.media_type === "tv" && (
                          <>
                            {item.number_of_seasons && (
                              <span>Phần {item.number_of_seasons}</span>
                            )}
                            {item.number_of_episodes && (
                              <span>{item.number_of_episodes} tập</span>
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
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-medium text-sm mb-3">Danh sách diễn viên</h3>
              <div className="space-y-3">
                {displayPeople.map((person) => (
                  <div
                    key={`person-${person.id}`}
                    onClick={() => handlePersonClick(person)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
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

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {person.name}
                      </p>
                      {person.known_for_department && (
                        <p className="text-gray-400 text-xs truncate">
                          {person.known_for_department}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show All Button */}
          {totalResults > 0 && (
            <div className="p-4">
              <button
                onClick={handleShowAll}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-300 hover:from-yellow-500 hover:to-orange-600 text-black font-medium text-sm py-2 px-4 rounded-lg transition-all duration-200"
              >
                Hiển thị toàn bộ ({results.total} kết quả)
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {showDropdown && !loading && query.trim() && totalResults === 0 && displayPeople.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 p-4"
        >
          <p className="text-gray-400 text-center text-sm">
            Không tìm thấy kết quả cho "{query}"
          </p>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
