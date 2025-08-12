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
      <div className="flex items-start gap-4 px-9">
        <h3 className="text-white font-medium text-sm w-24 text-right flex-shrink-0">
          Quốc gia:
        </h3>

        <div className="flex flex-wrap gap-2 flex-1">
          {/* Tất cả button */}
          <button
            onClick={handleSelectAll}
            className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 ${
              selectedCountries.length === 0
                ? "border border-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
                : "text-gray-300 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
            }`}
          >
            Tất cả
          </button>

          {/* Country buttons */}
          {POPULAR_MOVIE_COUNTRIES.map((country) => (
            <button
              key={country.iso_3166_1}
              onClick={() => handleCountryToggle(country.iso_3166_1)}
              className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 ${
                selectedCountries.includes(country.iso_3166_1)
                  ? "border border-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
                  : "text-gray-300 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryFilter;
