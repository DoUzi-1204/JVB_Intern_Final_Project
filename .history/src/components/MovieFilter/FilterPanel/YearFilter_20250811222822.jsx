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
        <div className="flex items-center gap-3">
          <h4 className="text-white text-xs whitespace-nowrap">
            Hoặc nhập năm:
          </h4>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
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
                  onChange(year);
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                if (value !== "") {
                  const year = parseInt(value);
                  if (year < 1900 || year > currentYear) {
                    onChange(null);
                    e.target.value = "";
                  }
                }
              }}
              placeholder="Nhập năm"
              className="w-full pl-10 pr-8 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            {selectedYear && (
              <button
                onClick={() => onChange(null)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-400 transition-colors duration-200"
                title="Xóa năm đã chọn"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
