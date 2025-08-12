import { FILTER_OPTIONS } from "../../../utils/constants";

const SortOptions = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold text-lg">Sắp xếp</h3>
      <select
        value={value || "popularity.desc"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
      >
        {FILTER_OPTIONS.SORT_BY.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOptions;
