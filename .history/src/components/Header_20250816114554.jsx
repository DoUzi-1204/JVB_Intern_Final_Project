import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { API_CONFIG, POPULAR_MOVIE_COUNTRIES } from "../utils/constants";
import AutoComplete from "./AutoComplete";
import { LuFilter } from "react-icons/lu";

// Custom hook cho dropdown
const useDropdown = (ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return { isOpen, setIsOpen, toggle: () => setIsOpen((prev) => !prev) };
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [genres, setGenres] = useState({ movies: [], tv: [] });
  const [loading, setLoading] = useState(false);

  const genreDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  const genreDropdown = useDropdown(genreDropdownRef);
  const countryDropdown = useDropdown(countryDropdownRef);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = API_CONFIG.BASE_URL;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch genres
  useEffect(() => {
    if (!API_KEY) return;
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=vi-VN`
          ),
          fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=vi-VN`),
        ]);
        const [movieData, tvData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ]);
        setGenres({
          movies: movieData.genres || [],
          tv: tvData.genres || [],
        });
      } catch (err) {
        console.error("Error fetching genres:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, [API_KEY, BASE_URL]);

  // Memoize genres + countries để tránh tính toán lại
  const mergedGenres = useMemo(() => {
    return [...genres.movies, ...genres.tv]
      .filter((g, i, arr) => i === arr.findIndex((x) => x.name === g.name))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [genres]);

  const sortedCountries = useMemo(() => {
    return [...POPULAR_MOVIE_COUNTRIES].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, []);

  const navLinkBase =
    "text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300";

  const Dropdown = ({
    label,
    items,
    isOpen,
    toggle,
    onClose,
    loading,
    refEl,
    type,
  }) => (
    <div className="relative" ref={refEl}>
      <div
        className={`flex items-center gap-1 ${navLinkBase}`}
        onClick={toggle}
      >
        <span>{label}</span>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`text-[12px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[600px] bg-zinc-900/90 border border-gray-700/50 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-sm">
          <div className="p-4">
            {loading ? (
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400 mx-auto"></div>
                <p className="mt-2 text-sm">
                  Đang tải {label.toLowerCase()}...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {items.map((item) => (
                  <Link
                    key={item.id || item.iso_3166_1}
                    to={`/${type}/${item.id || item.iso_3166_1}`}
                    className="text-left text-white text-sm py-2 px-3 hover:text-yellow-400 transition-colors duration-200 block"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
        isScrolled ? "bg-zinc-900 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
        >
          <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
          <span
            className="text-xl font-bold"
            style={{
              fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
              fontStyle: "normal",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
              letterSpacing: "1px",
              fontSize: "1rem",
            }}
          >
            Phàm Nhân
            <br />
            Tu Phim
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-5">
          <AutoComplete className="w-full" />
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-6 flex-shrink-0">
          <Dropdown
            label="Thể Loại"
            items={mergedGenres}
            isOpen={genreDropdown.isOpen}
            toggle={genreDropdown.toggle}
            onClose={() => genreDropdown.setIsOpen(false)}
            loading={loading}
            refEl={genreDropdownRef}
            type="genre"
          />
          <Dropdown
            label="Quốc Gia"
            items={sortedCountries}
            isOpen={countryDropdown.isOpen}
            toggle={countryDropdown.toggle}
            onClose={() => countryDropdown.setIsOpen(false)}
            refEl={countryDropdownRef}
            type="country"
          />
          <Link to="/movies" className={navLinkBase}>
            Phim Lẻ
          </Link>
          <Link to="/tv" className={navLinkBase}>
            Phim Bộ
          </Link>
          <Link to="/actors" className={navLinkBase}>
            Diễn Viên
          </Link>
          <Link
            to="/filter"
            className={`flex items-center gap-1 ${navLinkBase}`}
          >
            <span>Lọc Phim</span>
            <LuFilter className="w-3 h-3" />
          </Link>

          <Link
            to="/login"
            className={`flex items-center gap-2 bg-gray-200 rounded-2xl px-4 py-0 ${navLinkBase}`}
          >
            <UserIcon className="w-4 h-4 text-black" />
            <span className="text-black font-medium text-sm">Đăng nhập</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
