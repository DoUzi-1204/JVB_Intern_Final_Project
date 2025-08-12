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
    <div className="space-y-2">
      <h3 className="text-white font-medium text-sm ml-4 mb-2">Quốc gia:</h3>
      
      <div className="flex flex-wrap gap-2 ml-4">
        {/* Tất cả button */}
        <button
          onClick={handleSelectAll}
          className={`px-3 py-1.5 rounded-md text-sm font-normal transition-colors duration-200 border ${
            selectedCountries.length === 0
              ? "border-yellow-500 text-yellow-500"
              : "border-gray-700 text-gray-300 hover:border-gray-600"
          }`}
        >
          Tất cả
        </button>

        {/* Country buttons */}
        {POPULAR_MOVIE_COUNTRIES.map((country) => (
          <button
            key={country.iso_3166_1}
            onClick={() => handleCountryToggle(country.iso_3166_1)}
            className={`px-3 py-1.5 rounded-md text-sm font-normal transition-colors duration-200 border ${
              selectedCountries.includes(country.iso_3166_1)
                ? "border-yellow-500 text-yellow-500"
                : "border-gray-700 text-gray-300 hover:border-gray-600"
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
