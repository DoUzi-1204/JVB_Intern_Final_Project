import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_CONFIG, POPULAR_MOVIE_COUNTRIES } from "../../utils/constants";
import AutoComplete from "../AutoComplete";
import { CgMenu } from "react-icons/cg";
import DropDown from "./DropDown";
import Menu from "./Menu";

// Custom hook cho dropdown
const useDropdown = (ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Memoize genres + countries
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

  // Reset search khi resize ≥768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSearchOpen, isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
        isScrolled ? "bg-zinc-900 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        {!isSearchOpen && (
          <Link
            to="/"
            className="flex pl-3 items-center gap-2 text-white flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/logo.png"
              alt="Logo"
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
              Tu Phim
            </span>
          </Link>
        )}

        {/* Search */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSearchOpen ? "block md:hidden" : "hidden md:block"
          } max-w-none md:max-w-none xl:max-w-md`}
        >
          <AutoComplete className="w-full" />
        </div>

        {/* Nav desktop */}
        {!isSearchOpen && (
          <>
            <div className="hidden xl:flex items-center gap-5 flex-shrink-0 ml-auto">
              <Menu
                mergedGenres={mergedGenres}
                sortedCountries={sortedCountries}
                genreDropdown={genreDropdown}
                countryDropdown={countryDropdown}
                loading={loading}
                genreDropdownRef={genreDropdownRef}
                countryDropdownRef={countryDropdownRef}
                navLinkBase={navLinkBase}
                isMobile={false}
              />
              <Link
                to="/login"
                className={`flex items-center gap-2 bg-gray-300 rounded-2xl px-3 py-0 ${navLinkBase}`}
              >
                <UserIcon className="w-4 h-4 text-black" />
                <span className="text-black font-medium text-sm">
                  Đăng nhập
                </span>
              </Link>
            </div>
          </>
        )}

        {/* Buttons: Search toggle + Hamburger */}
        <div className="flex items-center gap-2">
          {/* Search toggle chỉ <md */}
          <div className="md:hidden">
            {isSearchOpen ? (
              <button onClick={() => setIsSearchOpen(false)}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-red-500 text-xl"
                />
              </button>
            ) : (
              <button onClick={() => setIsSearchOpen(true)}>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-white text-xl"
                />
              </button>
            )}
          </div>

          {/* Hamburger <xl */}
          {!isSearchOpen && (
            <button
              className="p-2 rounded-lg text-white block xl:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? (
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-red-500 text-xl"
                />
              ) : (
                <CgMenu className="w-6 h-6" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full max-w-[370px] bg-zinc-900/95 backdrop-blur-sm shadow-lg z-50 p-4 xl:hidden">
          {/* Đăng nhập trên cùng */}
          <Link
            to="/login"
            className={`flex items-center gap-2 bg-gray-300 rounded-2xl px-3 py-2 mb-4 ${navLinkBase}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <UserIcon className="w-4 h-4 text-black" />
            <span className="text-black font-medium text-sm">Đăng nhập</span>
          </Link>
          <Menu
            mergedGenres={mergedGenres}
            sortedCountries={sortedCountries}
            genreDropdown={genreDropdown}
            countryDropdown={countryDropdown}
            loading={loading}
            genreDropdownRef={genreDropdownRef}
            countryDropdownRef={countryDropdownRef}
            navLinkBase={navLinkBase}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isMobile={true}
          />
        </nav>
      )}
    </header>
  );
};

export default Header;
