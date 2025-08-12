import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Thêm import Link
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { API_CONFIG, POPULAR_MOVIE_COUNTRIES } from "../utils/constants";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [genres, setGenres] = useState({ movies: [], tv: [] });
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const genreDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = API_CONFIG.BASE_URL;

  // Danh sách quốc gia phổ biến có phim
  const POPULAR_MOVIE_COUNTRIES = [
    { iso_3166_1: "US", name: "Hoa Kỳ" },
    { iso_3166_1: "KR", name: "Hàn Quốc" },
    { iso_3166_1: "JP", name: "Nhật Bản" },
    { iso_3166_1: "CN", name: "Trung Quốc" },
    { iso_3166_1: "VN", name: "Việt Nam" },
    { iso_3166_1: "TH", name: "Thái Lan" },
    { iso_3166_1: "IN", name: "Ấn Độ" },
    { iso_3166_1: "GB", name: "Anh" },
    { iso_3166_1: "FR", name: "Pháp" },
    { iso_3166_1: "DE", name: "Đức" },
    { iso_3166_1: "IT", name: "Ý" },
    { iso_3166_1: "ES", name: "Tây Ban Nha" },
    { iso_3166_1: "RU", name: "Nga" },
    { iso_3166_1: "CA", name: "Canada" },
    { iso_3166_1: "AU", name: "Úc" },
    { iso_3166_1: "BR", name: "Brazil" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      if (!API_KEY) return;

      setLoading(true);
      try {
        const [movieGenresRes, tvGenresRes] = await Promise.all([
          fetch(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=vi-VN`
          ),
          fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=vi-VN`),
        ]);

        const movieGenresData = await movieGenresRes.json();
        const tvGenresData = await tvGenresRes.json();

        setGenres({
          movies: movieGenresData.genres || [],
          tv: tvGenresData.genres || [],
        });
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [API_KEY]);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        genreDropdownRef.current &&
        !genreDropdownRef.current.contains(event.target)
      ) {
        setShowGenreDropdown(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleGenreDropdown = () => {
    setShowGenreDropdown(!showGenreDropdown);
  };

  const toggleCountryDropdown = () => {
    setShowCountryDropdown(!showCountryDropdown);
  };

  const navLinkBase =
    "text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300";

  const navDropdown = "flex items-center gap-[6px] " + navLinkBase;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
        isScrolled ? "bg-zinc-900 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 flex items-center justify-between gap-4">
        {/* Logo - Thay button bằng Link */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
        >
          <img
            src="/logo.png"
            alt="PhamNhanTuPhim Logo"
            className="w-9 h-9 object-contain"
          />
          <span
            className="text-xl font-bold"
            style={{
              fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
              fontStyle: "normal",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
              letterSpacing: "1px",
              fontSize: "1.5rem",
            }}
          >
            Phàm Nhân Tu Phim
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm phim, diễn viên"
              className="w-full py-2.5 px-4 pr-12 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-white/70 outline-none focus:bg-white/15 focus:border-white/40 transition-all duration-300"
            />
            <Link
              to="/search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-yellow-500 transition-colors duration-300"
            >
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
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6 flex-shrink-0">
          {/* Genre Dropdown - giữ nguyên vì có dropdown */}
          <div className="relative" ref={genreDropdownRef}>
            <div className={navDropdown} onClick={toggleGenreDropdown}>
              <span>Thể Loại</span>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`text-[12px] relative top-[1.5px] ml-base transition-transform duration-200 ${
                  showGenreDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Genre Dropdown Menu */}
            {showGenreDropdown && (
              <div className="absolute top-full left-0 mt-2 w-[600px] bg-zinc-900/90 border border-gray-700/50 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-sm">
                {loading ? (
                  <div className="p-6 text-center text-white">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400 mx-auto"></div>
                    <p className="mt-2 text-sm">Đang tải thể loại...</p>
                  </div>
                ) : (
                  <div className="p-4">
                    <div>
                      <div className="grid grid-cols-4 gap-2">
                        {[...genres.movies, ...genres.tv]
                          .filter(
                            (genre, index, self) =>
                              index ===
                              self.findIndex((g) => g.name === genre.name)
                          )
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((genre) => (
                            <Link
                              key={`genre-${genre.id}-${genre.name}`}
                              to={`/genre/${genre.id}`}
                              className="text-left text-white text-sm py-2 px-3 hover:text-yellow-400 transition-colors duration-200 block"
                              onClick={() => {
                                setShowGenreDropdown(false);
                              }}
                            >
                              {genre.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Country Dropdown - giữ nguyên vì có dropdown */}
          <div className="relative" ref={countryDropdownRef}>
            <div className={navDropdown} onClick={toggleCountryDropdown}>
              <span>Quốc Gia</span>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`text-[12px] relative top-[1.5px] ml-base transition-transform duration-200 ${
                  showCountryDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Country Dropdown Menu */}
            {showCountryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-[600px] bg-zinc-900/90 border border-gray-700/50 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-sm">
                <div className="p-4">
                  <div>
                    <div className="grid grid-cols-4 gap-2">
                      {POPULAR_MOVIE_COUNTRIES.sort((a, b) =>
                        a.name.localeCompare(b.name)
                      ).map((country) => (
                        <Link
                          key={country.iso_3166_1}
                          to={`/country/${country.iso_3166_1}`}
                          className="text-left text-white text-sm py-2 px-3 hover:text-yellow-400 transition-colors duration-200 block"
                          onClick={() => {
                            setShowCountryDropdown(false);
                          }}
                        >
                          {country.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Static Links - Thay div bằng Link */}
          <Link to="/movies" className={navLinkBase}>
            <span>Phim Lẻ</span>
          </Link>

          <Link to="/tv" className={navLinkBase}>
            <span>Phim Bộ</span>
          </Link>

          <Link to="/actors" className={navLinkBase}>
            <span>Diễn Viên</span>
          </Link>

          {/* Lọc phim - Thay div bằng Link */}
          <Link
            to="/filter"
            className={`flex items-center gap-1 ${navLinkBase}`}
          >
            <span>Lọc Phim</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Thành viên - Thay div bằng Link */}
          <Link
            to="/login"
            className={`flex items-center gap-2 ${navLinkBase}`}
          >
            <UserIcon className="w-4 h-4 text-white" />
            <span>Đăng nhập</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
