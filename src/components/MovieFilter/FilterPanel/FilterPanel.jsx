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
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div className="rounded-lg overflow-hidden ">
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
        <div className="px-3 py-3 space-y-3 border border-gray-700 rounded-lg mt-2">
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
          <ActionButtons
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
