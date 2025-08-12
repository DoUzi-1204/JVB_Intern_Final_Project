import { FILTER_OPTIONS } from "../../../utils/constants";

const SortOptions = ({ value, onChange }) => {
  const handleSortChange = (sortValue) => {
    onChange(sortValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-4 px-9">
        <h3 className="text-white font-medium text-sm w-24 text-right flex-shrink-0">
          Sắp xếp:
        </h3>

        <div className="flex flex-wrap gap-2 flex-1">
          {FILTER_OPTIONS.SORT_BY.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 border ${
                (value || "popularity.desc") === option.value
                  ? "border-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
                  : "border-gray-700 text-gray-300 hover:border-gray-600 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
