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
    <div className="space-y-2">
      <div className="flex items-start gap-4 px-9">
        <h3 className="text-white font-medium text-sm w-24 text-right flex-shrink-0">
          Năm sản xuất:
        </h3>

        <div className="flex flex-wrap gap-2 flex-1 items-center">
          {/* Tất cả button */}
          <button
            onClick={handleSelectAll}
            className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 ${
              !selectedYear
                ? "text-yellow-500"
                : "text-gray-300 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
            }`}
          >
            Tất cả
          </button>

          {/* Year buttons */}
          {popularYears.map((year) => (
            <button
              key={year}
              onClick={() => handleYearToggle(year)}
              className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 ${
                selectedYear === year
                  ? "text-yellow-500"
                  : "text-gray-300 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
              }`}
            >
              {year}
            </button>
          ))}

          {/* Input box nằm cùng dòng */}
          <div className="relative">
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
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={selectedYear || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Chỉ cho phép số
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
              className="w-32 pl-10 pr-8 py-1.5 bg-gray-800 border border-gray-600 rounded-md text-white text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
      </div>
    </div>
  );
};

export default YearFilter;
