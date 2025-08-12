import { useState } from "react";
import GenreFilter from "./GenreFilter";
import CountryFilter from "./CountryFilter";
import YearFilter from "./YearFilter";
import AgeFilter from "./AgeFilter";
import SortOptions from "./SortOptions";

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-semibold flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Bộ lọc phim
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition-colors duration-200"
          >
            Xóa bộ lọc
          </button>
          <button
            onClick={toggleExpanded}
            className="p-2 text-white hover:text-yellow-400 transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
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
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Sort Options */}
          <SortOptions
            value={filters.sortBy}
            onChange={(sortBy) => onFiltersChange({ ...filters, sortBy })}
          />

          {/* Genre Filter */}
          <GenreFilter
            selectedGenres={filters.genres}
            onChange={(genres) => onFiltersChange({ ...filters, genres })}
          />

          {/* Country Filter */}
          <CountryFilter
            selectedCountries={filters.countries}
            onChange={(countries) => onFiltersChange({ ...filters, countries })}
          />

          {/* Year Filter */}
          <YearFilter
            yearRange={filters.yearRange}
            onChange={(yearRange) => onFiltersChange({ ...filters, yearRange })}
          />

          {/* Age Rating Filter */}
          <AgeFilter
            selectedRatings={filters.ageRatings}
            onChange={(ageRatings) => onFiltersChange({ ...filters, ageRatings })}
          />
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
