const TypeFilter = ({ selectedType, onChange }) => {
  const contentTypes = [
    { value: "movie", label: "Phim lẻ" },
    { value: "tv", label: "Phim bộ" },
  ];

  const handleTypeToggle = (type) => {
    // Nếu type đã được chọn, bỏ chọn (về tất cả)
    if (selectedType === type) {
      onChange(null);
    } else {
      // Chọn type mới
      onChange(type);
    }
  };

  const handleSelectAll = () => {
    onChange(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-white font-medium text-sm mr-3">Loại phim:</h3>

        {/* Tất cả button */}
        <button
          onClick={handleSelectAll}
          className={`px-3 py-1.5 rounded-md text-sm font-normal transition-colors duration-200 border ${
            !selectedType
              ? "border-yellow-500 text-yellow-500"
              : "border-gray-700 text-gray-300 hover:border-gray-600"
          }`}
        >
          Tất cả
        </button>

        {/* Type buttons */}
        {contentTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeToggle(type.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-normal transition-colors duration-200 flex items-center gap-1 border ${
              selectedType === type.value
                ? "border-yellow-500 text-yellow-500"
                : "border-gray-700 text-white hover:border-gray-600"
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeFilter;
