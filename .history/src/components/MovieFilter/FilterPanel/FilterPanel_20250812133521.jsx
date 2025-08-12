import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import GenreFilter from "./GenreFilter";
import CountryFilter from "./CountryFilter";
import YearFilter from "./YearFilter";
import AgeFilter from "./AgeFilter";
import SortOptions from "./SortOptions";
import TypeFilter from "./TypeFilter";
import ActionButtons from "./ActionButtons";

const FilterPanel = ({
  filters,
  onFiltersChange,
  onClearFilters,
  onApplyFilters,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={toggleExpanded}
        className="w-full px-3 py-3 flex items-center gap-2 text-white text-base font-semibold transition-colors duration-200"
      >
        <LuFilter
          size={15}
          className={isExpanded ? "text-yellow-400" : "text-white"}
        />
        Bộ lọc
      </button>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-3 space-y-3 border border-gray-700 rounded-lg mt-2">
          {/* Type Filter */}
          <div className="border-b border-gray-700 pb-3">
            <TypeFilter
              selectedType={filters.contentType}
              onChange={(contentType) =>
                onFiltersChange({ ...filters, contentType })
              }
            />
          </div>

          {/* Country Filter */}
          <div className="border-b border-gray-700 pb-3">
            <CountryFilter
              selectedCountries={filters.countries}
              onChange={(countries) =>
                onFiltersChange({ ...filters, countries })
              }
            />
          </div>

          {/* Age Rating Filter */}
          <div className="border-b border-gray-700 pb-3">
            <AgeFilter
              selectedRatings={filters.ageRatings}
              onChange={(ageRatings) =>
                onFiltersChange({ ...filters, ageRatings })
              }
            />
          </div>

          {/* Genre Filter */}
          <div className="border-b border-gray-700 pb-3">
            <GenreFilter
              selectedGenres={filters.genres}
              onChange={(genres) => onFiltersChange({ ...filters, genres })}
            />
          </div>

          {/* Year Filter */}
          <div className="border-b border-gray-700 pb-3">
            <YearFilter
              selectedYear={filters.selectedYear}
              onChange={(selectedYear) =>
                onFiltersChange({ ...filters, selectedYear })
              }
            />
          </div>

          {/* Sort Options */}
          <div className="border-b border-gray-700 pb-3">
            <SortOptions
              value={filters.sortBy}
              onChange={(sortBy) => onFiltersChange({ ...filters, sortBy })}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-1">
            <div className="flex gap-3 justify-start">
              <button
                onClick={onApplyFilters}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Lọc phim
              </button>

              <button
                onClick={onClearFilters}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200"
              >
                Xóa bộ lọc
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200"
                >
                  Đóng
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
