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
    <div className="space-y-2">
      <div className="flex items-start gap-4 px-9">
        <h3 className="text-white font-medium text-sm w-24 text-right flex-shrink-0">
          Loại phim:
        </h3>

        <div className="flex flex-wrap gap-2 flex-1">
          {/* Tất cả button */}
          <button
            onClick={handleSelectAll}
            className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 ${
              !selectedType
                ? "border border-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
                : "text-gray-300 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
            }`}
          >
            Tất cả
          </button>

          {/* Type buttons */}
          {contentTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleTypeToggle(type.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 flex items-center gap-1 ${
                selectedType === type.value
                  ? "border border-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
                  : "text-gray-300 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeFilter;
