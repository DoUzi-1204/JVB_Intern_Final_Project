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
        ? "flex flex-col items-center gap-3"
        : "flex items-center gap-5 flex-shrink-0 ml-auto"
    }
  >
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
      to="/movies"
      className={navLinkBase}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
    >
      Phim Lẻ
    </Link>
    <Link
      to="/tv"
      className={navLinkBase}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
    >
      Phim Bộ
    </Link>
    <Link
      to="/actors"
      className={navLinkBase}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
    >
      Diễn Viên
    </Link>
    <Link
      to="/filter"
      className={`flex items-center gap-1 ${navLinkBase}`}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
    >
      <span>Lọc Phim</span>
      <LuFilter className="w-3 h-3" />
    </Link>
  </nav>
);

export default Menu;
