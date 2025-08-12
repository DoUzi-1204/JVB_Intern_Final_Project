import { FILTER_OPTIONS } from "../../../utils/constants";

const AgeFilter = ({ selectedRatings, onChange }) => {
  const handleRatingToggle = (rating) => {
    const newSelectedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    onChange(newSelectedRatings);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold text-lg">Độ tuổi</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {FILTER_OPTIONS.AGE_RATINGS.map((rating) => (
          <label
            key={rating.value}
            className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-800/50 transition-colors duration-200"
          >
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating.value)}
              onChange={() => handleRatingToggle(rating.value)}
              className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
            />
            <span className="text-white text-sm">{rating.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AgeFilter;
