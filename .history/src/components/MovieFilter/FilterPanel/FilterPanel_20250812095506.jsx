import { useState } from "react";
import { FaFilter } from "react-icons/fa6"; // Thêm icon mới
import GenreFilter from "./GenreFilter";
import CountryFilter from "./CountryFilter";
import YearFilter from "./YearFilter";
import AgeFilter from "./AgeFilter";
import SortOptions from "./SortOptions";
import TypeFilter from "./TypeFilter";

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
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800/80 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <h2 className="text-white text-base font-semibold flex items-center gap-2">
          <FaFilter className="text-yellow-300" size={12} />
          Bộ lọc
        </h2>
        <button
          onClick={toggleExpanded}
          className="p-1 text-white hover:text-yellow-400 transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className={`transform transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Type Filter */}
          <div className="border-b border-gray-700 pb-4">
            <TypeFilter
              selectedType={filters.contentType}
              onChange={(contentType) =>
                onFiltersChange({ ...filters, contentType })
              }
            />
          </div>

          {/* Country Filter */}
          <div className="border-b border-gray-700 pb-4">
            <CountryFilter
              selectedCountries={filters.countries}
              onChange={(countries) =>
                onFiltersChange({ ...filters, countries })
              }
            />
          </div>

          {/* Age Rating Filter */}
          <div className="border-b border-gray-700 pb-4">
            <AgeFilter
              selectedRatings={filters.ageRatings}
              onChange={(ageRatings) =>
                onFiltersChange({ ...filters, ageRatings })
              }
            />
          </div>

          {/* Genre Filter */}
          <div className="border-b border-gray-700 pb-4">
            <GenreFilter
              selectedGenres={filters.genres}
              onChange={(genres) => onFiltersChange({ ...filters, genres })}
            />
          </div>

          {/* Year Filter */}
          <div className="border-b border-gray-700 pb-4">
            <YearFilter
              selectedYear={filters.selectedYear}
              onChange={(selectedYear) =>
                onFiltersChange({ ...filters, selectedYear })
              }
            />
          </div>

          {/* Sort Options */}
          <div className="border-b border-gray-700 pb-4">
            <SortOptions
              value={filters.sortBy}
              onChange={(sortBy) => onFiltersChange({ ...filters, sortBy })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={onApplyFilters}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
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

            <div className="flex gap-2">
              <button
                onClick={onClearFilters}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Xóa bộ lọc
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
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
