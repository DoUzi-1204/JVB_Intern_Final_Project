import { POPULAR_MOVIE_COUNTRIES } from "../../../utils/constants";

const CountryFilter = ({ selectedCountries, onChange }) => {
  const handleCountryToggle = (countryCode) => {
    const newSelectedCountries = selectedCountries.includes(countryCode)
      ? selectedCountries.filter((code) => code !== countryCode)
      : [...selectedCountries, countryCode];
    onChange(newSelectedCountries);
  };

  const handleSelectAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-white font-medium text-sm mr-3">Quốc gia:</h3>

        {/* Tất cả button */}
        <button
          onClick={handleSelectAll}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
            selectedCountries.length === 0
              ? "bg-yellow-500 text-black"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          Tất cả
        </button>

        {/* Country buttons - sắp xếp theo alphabet giống Header */}
        {POPULAR_MOVIE_COUNTRIES.sort((a, b) =>
          a.name.localeCompare(b.name)
        ).map((country) => (
          <button
            key={country.iso_3166_1}
            onClick={() => handleCountryToggle(country.iso_3166_1)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
              selectedCountries.includes(country.iso_3166_1)
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {country.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryFilter;
