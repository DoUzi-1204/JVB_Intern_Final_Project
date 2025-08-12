import { FILTER_OPTIONS } from "../../../utils/constants";

const SortOptions = ({ value, onChange }) => {
  const handleSortChange = (sortValue) => {
    onChange(sortValue);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-white font-medium text-sm mr-3">Sắp xếp:</h3>

        {FILTER_OPTIONS.SORT_BY.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
              (value || "popularity.desc") === option.value
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white hover:bg-gray-600"
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
