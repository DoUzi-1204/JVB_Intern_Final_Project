import { Link, useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import { LuFilter } from "react-icons/lu";
import { useEffect } from "react";

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
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopstate = (event) => {
      if (event.state && event.state.idx !== undefined) {
        // Handle the back/forward navigation
        const { idx } = event.state;
        // Your logic to update the UI based on the new index
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

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
            <Link
              to="/filter"
              className={`flex items-center gap-1 ${navLinkBase}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Lọc Phim</span>
              <LuFilter className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid auto-rows-fr gap-3 justify-start items-start min-h-[120px]">
            <Link
              to="/actors"
              className={navLinkBase}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Diễn Viên
            </Link>
            <Link
              to="/movies"
              className={navLinkBase}
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/filter?contentType=movie");
              }}
            >
              Phim Lẻ
            </Link>
            <Link
              to="/tv"
              className={navLinkBase}
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/filter?contentType=tv");
              }}
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
          <Link
            to="/movies"
            className={navLinkBase}
            onClick={() => navigate("/filter?contentType=movie")}
          >
            Phim Lẻ
          </Link>
          <Link
            to="/tv"
            className={navLinkBase}
            onClick={() => navigate("/filter?contentType=tv")}
          >
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
};

export default Menu;
