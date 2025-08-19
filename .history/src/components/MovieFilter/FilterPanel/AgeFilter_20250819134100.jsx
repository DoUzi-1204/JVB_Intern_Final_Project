import { FILTER_OPTIONS } from "../../../utils/constants";

const AgeFilter = ({ selectedRatings, onChange }) => {
  const handleRatingToggle = (rating) => {
    const newSelectedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    onChange(newSelectedRatings);
  };

  const handleSelectAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col xs:flex-row items-start gap-4 px-0 md:px-9">
        <h3 className="text-white font-medium text-sm w-24 text-right flex-shrink-0">
          Độ tuổi:
        </h3>

        <div className="flex flex-wrap gap-2 flex-1">
          {/* Tất cả button */}
          <button
            onClick={handleSelectAll}
            className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 border ${
              selectedRatings.length === 0
                ? "border-yellow-500 text-yellow-500"
                : "border-gray-700 text-gray-300 hover:border-gray-600 hover:text-yellow-300"
            }`}
          >
            Tất cả
          </button>

          {/* Rating buttons */}
          {FILTER_OPTIONS.AGE_RATINGS.map((rating) => (
            <button
              key={rating.value}
              onClick={() => handleRatingToggle(rating.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 border ${
                selectedRatings.includes(rating.value)
                  ? "border-yellow-500 text-yellow-500"
                  : "border-gray-700 text-gray-300 hover:border-gray-600 hover:text-yellow-300"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: rating.label }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgeFilter;
