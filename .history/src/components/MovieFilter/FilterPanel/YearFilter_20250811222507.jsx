const YearFilter = ({ selectedYear, onChange }) => {
  const currentYear = new Date().getFullYear();

  // Tạo danh sách các năm phổ biến
  const popularYears = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
  ]
    .filter(
      (year, index, self) => self.indexOf(year) === index && year <= currentYear
    )
    .sort((a, b) => b - a);

  const handleYearToggle = (year) => {
    // Nếu năm đã được chọn, bỏ chọn
    if (selectedYear === year) {
      onChange(null);
    } else {
      // Chọn năm cụ thể
      onChange(year);
    }
  };

  const handleSelectAll = () => {
    onChange(null);
  };

  return (
    <div className="space-y-3">
      {/* Popular years as buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h3 className="text-white font-medium text-sm mr-3">Năm sản xuất:</h3>

        {/* Tất cả button */}
        <button
          onClick={handleSelectAll}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
            !selectedYear
              ? "bg-yellow-500 text-black"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          Tất cả
        </button>

        {/* Year buttons */}
        {popularYears.map((year) => (
          <button
            key={year}
            onClick={() => handleYearToggle(year)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
              selectedYear === year
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Custom year selection */}
      <div className="border-t border-gray-700 pt-3">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-white text-xs">Hoặc nhập năm:</h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1900"
              max={currentYear}
              value={selectedYear || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  onChange(null);
                } else {
                  const year = parseInt(value);
                  // Cho phép nhập tự do, chỉ validate khi hoàn thành
                  onChange(year);
                }
              }}
              onBlur={(e) => {
                // Validate khi blur (rời khỏi input)
                const value = e.target.value;
                if (value !== "") {
                  const year = parseInt(value);
                  if (year < 1900 || year > currentYear) {
                    onChange(null);
                    e.target.value = "";
                  }
                }
              }}
              placeholder="1900-2025"
              className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent w-24"
            />
            {selectedYear && (
              <button
                onClick={() => onChange(null)}
                className="px-1.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors duration-200"
                title="Xóa năm đã chọn"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Selected year indicator */}
        {selectedYear && (
          <div className="mt-2">
            <span className="px-3 py-1.5 bg-yellow-500 text-black rounded-full text-xs font-medium">
              Năm {selectedYear}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearFilter;
