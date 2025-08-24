import { Link, useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import { LuFilter } from "react-icons/lu";

const Menu = ({
  mergedGenres,
  sortedCountries,
  genreDropdown,
  countryDropdown,
  loading,
  genreDropdownRef,
  countryDropdownRef,
  navLinkBase,
  setIsMobileMenuOpen,
  isMobile,
  closeAllOverlays,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (to, closeMobile = false) => {
    if (closeAllOverlays) closeAllOverlays();
    if (closeMobile && setIsMobileMenuOpen) setIsMobileMenuOpen(false);
    navigate(to);
  };

  return (
    <nav
      className={
        isMobile
          ? "grid grid-cols-2 gap-3 items-center"
          : "flex items-center gap-5 flex-shrink-0 ml-auto"
      }
    >
      {isMobile ? (
        <>
          <div className="grid auto-rows-fr gap-3 justify-start items-start min-h-[120px]">
            <DropDown
              label="Thể Loại"
              items={mergedGenres}
              isOpen={genreDropdown.isOpen}
              toggle={genreDropdown.toggle}
              onClose={() => genreDropdown.setIsOpen(false)}
              loading={loading}
              refEl={genreDropdownRef}
              type="genre"
            />
            <DropDown
              label="Quốc Gia"
              items={sortedCountries}
              isOpen={countryDropdown.isOpen}
              toggle={countryDropdown.toggle}
              onClose={() => countryDropdown.setIsOpen(false)}
              refEl={countryDropdownRef}
              type="country"
            />
            <button
              className={`flex items-center gap-1 ${navLinkBase}`}
              onClick={() => handleNavigate("/filter", true)}
            >
              <span>Lọc Phim</span>
              <LuFilter className="w-3 h-3" />
            </button>
          </div>

          <div className="grid auto-rows-fr gap-3 justify-start items-start min-h-[120px]">
            <button className={navLinkBase} onClick={() => handleNavigate("/actors", true)}>
              Diễn Viên
            </button>
            <button className={navLinkBase} onClick={() => handleNavigate("/filter?contentType=movie", true)}>
              Phim Lẻ
            </button>
            <button className={navLinkBase} onClick={() => handleNavigate("/filter?contentType=tv", true)}>
              Phim Bộ
            </button>
          </div>
        </>
      ) : (
        <>
          <DropDown
            label="Thể Loại"
            items={mergedGenres}
            isOpen={genreDropdown.isOpen}
            toggle={genreDropdown.toggle}
            onClose={() => genreDropdown.setIsOpen(false)}
            loading={loading}
            refEl={genreDropdownRef}
            type="genre"
          />
          <DropDown
            label="Quốc Gia"
            items={sortedCountries}
            isOpen={countryDropdown.isOpen}
            toggle={countryDropdown.toggle}
            onClose={() => countryDropdown.setIsOpen(false)}
            refEl={countryDropdownRef}
            type="country"
          />
          <button className={navLinkBase} onClick={() => handleNavigate("/filter?contentType=movie")}>
            Phim Lẻ
          </button>
          <button className={navLinkBase} onClick={() => handleNavigate("/filter?contentType=tv")}>
            Phim Bộ
          </button>
          <Link to="/actors" className={navLinkBase} onClick={() => closeAllOverlays && closeAllOverlays()}>
            Diễn Viên
          </Link>
          <button className={`flex items-center gap-1 ${navLinkBase}`} onClick={() => handleNavigate("/filter")}>
            <span>Lọc Phim</span>
            <LuFilter className="w-3 h-3" />
          </button>
        </>
      )}
    </nav>
  );
};

export default Menu;
