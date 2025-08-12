import { FILTER_OPTIONS } from "../../../utils/constants";

const SortOptions = ({ value, onChange }) => {
  const handleSortChange = (sortValue) => {
    onChange(sortValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-white font-medium text-sm mr-2">Sắp xếp:</h3>

        {FILTER_OPTIONS.SORT_BY.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-normal transition-colors duration-200 border ${
              (value || "popularity.desc") === option.value
                ? "border-yellow-500 text-yellow-500"
                : "border-gray-700 text-gray-300 hover:border-gray-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;
