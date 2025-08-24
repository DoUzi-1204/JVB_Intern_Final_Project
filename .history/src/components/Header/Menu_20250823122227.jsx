import { Link } from "react-router-dom";
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
}) => (
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
          <Link
            to="/filter"
            className={`flex items-center gap-1 ${navLinkBase}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Lọc Phim</span>
            <LuFilter className="w-3 h-3" />
          <Link to="/filter?contentType=movie" className={navLinkBase}>
            Phim Lẻ
          </Link>
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Diễn Viên
          </Link>
          <Link
            to="/movies"
            className={navLinkBase}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Phim Lẻ
          </Link>
          <Link
            to="/tv"
            className={navLinkBase}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Phim Bộ
          </Link>
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
        <Link to="/movies" className={navLinkBase}>
          Phim Lẻ
        </Link>
        <Link to="/filter?contentType=tv" className={navLinkBase}>
          Phim Bộ
        </Link>
        <Link to="/actors" className={navLinkBase}>
          Diễn Viên
        </Link>
        <Link to="/filter" className={`flex items-center gap-1 ${navLinkBase}`}>
          <span>Lọc Phim</span>
          <LuFilter className="w-3 h-3" />
        </Link>
      </>
    )}
  </nav>
);

export default Menu;
