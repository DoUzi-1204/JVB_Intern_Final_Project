import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { API_CONFIG, POPULAR_MOVIE_COUNTRIES } from "../utils/constants";
import AutoComplete from "./AutoComplete";
import { LuFilter } from "react-icons/lu";
import { CgMenu } from "react-icons/cg";

// Custom hook cho dropdown desktop
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

// Các nút nav chung
const NAV_ITEMS = [
  { type: "dropdown", label: "Thể Loại", key: "genre" },
  { type: "dropdown", label: "Quốc Gia", key: "country" },
  { type: "link", label: "Phim Lẻ", to: "/movies" },
  { type: "link", label: "Phim Bộ", to: "/tv" },
  { type: "link", label: "Diễn Viên", to: "/actors" },
  {
    type: "link",
    label: "Lọc Phim",
    to: "/filter",
    icon: <LuFilter className="w-3 h-3" />,
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [genres, setGenres] = useState({ movies: [], tv: [] });
  const [loading, setLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [mobileDropdown, setMobileDropdown] = useState({
    genre: false,
    country: false,
  });
  const toggleMobileDropdown = (key) =>
    setMobileDropdown((prev) => ({ ...prev, [key]: !prev[key] }));

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
        setGenres({ movies: movieData.genres || [], tv: tvData.genres || [] });
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

  // Reset search và mobile menu khi resize ≥768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dropdown component dùng cho desktop
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
          <nav className="hidden xl:flex items-center gap-5 flex-shrink-0 ml-auto">
            {NAV_ITEMS.map((item) =>
              item.type === "link" ? (
                <Link key={item.label} to={item.to} className={navLinkBase}>
                  {item.label}
                  {item.icon && item.icon}
                </Link>
              ) : (
                <Dropdown
                  key={item.label}
                  label={item.label}
                  items={item.key === "genre" ? mergedGenres : sortedCountries}
                  isOpen={
                    item.key === "genre"
                      ? genreDropdown.isOpen
                      : countryDropdown.isOpen
                  }
                  toggle={
                    item.key === "genre"
                      ? genreDropdown.toggle
                      : countryDropdown.toggle
                  }
                  onClose={
                    item.key === "genre"
                      ? () => genreDropdown.setIsOpen(false)
                      : () => countryDropdown.setIsOpen(false)
                  }
                  loading={loading}
                  refEl={
                    item.key === "genre" ? genreDropdownRef : countryDropdownRef
                  }
                  type={item.key}
                />
              )
            )}
            {/* Đăng nhập desktop */}
            <Link
              to="/login"
              className={`flex items-center gap-2 bg-gray-300 rounded-2xl px-3 py-0 ${navLinkBase}`}
            >
              <UserIcon className="w-4 h-4 text-black" />
              <span className="text-black font-medium text-sm">Đăng nhập</span>
            </Link>
          </nav>
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
              <CgMenu className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-sm shadow-lg z-50 p-4 xl:hidden">
          {/* Đăng nhập trên cùng */}
          <Link
            to="/login"
            className={`flex items-center gap-2 bg-gray-300 rounded-2xl px-3 py-2 mb-4 ${navLinkBase}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <UserIcon className="w-4 h-4 text-black" />
            <span className="text-black font-medium text-sm">Đăng nhập</span>
          </Link>

          {/* 6 nút còn lại xếp 2 cột */}
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={navLinkBase + " flex items-center gap-1"}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.icon && item.icon}
                  </Link>
                );
              } else if (item.type === "dropdown") {
                const isOpen = mobileDropdown[item.key];
                const itemsList =
                  item.key === "genre" ? mergedGenres : sortedCountries;
                return (
                  <div key={item.label} className="relative">
                    <div
                      className={`${navLinkBase} flex items-center gap-1`}
                      onClick={() => toggleMobileDropdown(item.key)}
                    >
                      <span>{item.label}</span>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className={`text-[12px] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {isOpen && (
                      <div className="absolute left-0 top-full mt-1 w-[90vw] max-h-60 overflow-y-auto bg-zinc-900/90 border border-gray-700/50 rounded-lg z-50 p-2">
                        {itemsList.map((i) => (
                          <Link
                            key={i.id || i.iso_3166_1}
                            to={`/${item.key}/${i.id || i.iso_3166_1}`}
                            className="block text-white text-sm py-1 px-2 hover:text-yellow-400"
                            onClick={() => {
                              setMobileDropdown((prev) => ({
                                ...prev,
                                [item.key]: false,
                              }));
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {i.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
