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
          <a
            href="/filter"
            className={`flex items-center gap-1 ${navLinkBase}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Lọc Phim</span>
            <LuFilter className="w-3 h-3" />
          </a>
        </div>
        <div className="grid auto-rows-fr gap-3 justify-start items-start min-h-[120px]">
          <Link
            to="/actors"
            className={navLinkBase}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Diễn Viên
          </Link>
          <a
            href="/filter?contentType=movie"
            className={navLinkBase}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Phim Lẻ
          </a>
          <a
            href="/filter?contentType=tv"
            className={navLinkBase}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Phim Bộ
          </a>
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
        <AutoReloadToggle className="text-white" />
        <a href="/filter?contentType=movie" className={navLinkBase}>
          Phim Lẻ
        </a>
        <a href="/filter?contentType=tv" className={navLinkBase}>
          Phim Bộ
        </a>
        <Link to="/actors" className={navLinkBase}>
          Diễn Viên
        </Link>
        <a href="/filter" className={`flex items-center gap-1 ${navLinkBase}`}>
          <span>Lọc Phim</span>
          <LuFilter className="w-3 h-3" />
        </a>
      </>
    )}
  </nav>
);

export default Menu;
