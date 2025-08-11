import { useState, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* Logo */}
        <button className="flex items-center gap-2 text-white flex-shrink-0 hover:opacity-80 transition-opacity duration-300">
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
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm phim, diễn viên"
              className="w-full py-2.5 px-4 pr-12 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-white/70 outline-none focus:bg-white/15 focus:border-white/40 transition-all duration-300"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-yellow-500 transition-colors duration-300">
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
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6 flex-shrink-0">
          {/* Dropdowns */}
          {[{ label: "Thể Loại" }, { label: "Quốc Gia" }].map(({ label }) => (
            <div key={label} className={navDropdown}>
              <span>{label}</span>
              <FontAwesomeIcon
                icon={faCaretDown}
                className="text-[12px] relative top-[1.5px] ml-base"
              />
            </div>
          ))}

          {/* Static Links */}
          {["Phim Lẻ", "Phim Bộ", "Diễn Viên"].map((label) => (
            <div key={label} className={navLinkBase}>
              <span>{label}</span>
            </div>
          ))}

          {/* Lọc phim */}
          <div className={`flex items-center gap-1 ${navLinkBase}`}>
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
          </div>

          {/* Thành viên */}
          <div className={`flex items-center gap-2 ${navLinkBase}`}>
            <UserIcon className="w-4 h-4 text-white" />
            <span>Đăng nhập</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
