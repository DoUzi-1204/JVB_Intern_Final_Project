import { POPULAR_MOVIE_COUNTRIES } from "../../../utils/constants";

const CountryFilter = ({ selectedCountries, onChange }) => {
  const handleCountryToggle = (countryCode) => {
    const newSelectedCountries = selectedCountries.includes(countryCode)
      ? selectedCountries.filter((code) => code !== countryCode)
      : [...selectedCountries, countryCode];
    onChange(newSelectedCountries);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold text-lg">Quốc gia</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
        {POPULAR_MOVIE_COUNTRIES.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
          <label
            key={country.iso_3166_1}
            className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-800/50 transition-colors duration-200"
          >
            <input
              type="checkbox"
              checked={selectedCountries.includes(country.iso_3166_1)}
              onChange={() => handleCountryToggle(country.iso_3166_1)}
              className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
            />
            <span className="text-white text-sm">{country.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CountryFilter;
