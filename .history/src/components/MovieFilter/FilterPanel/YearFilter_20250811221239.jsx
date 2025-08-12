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
            !yearRange.min && !yearRange.max
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
              yearRange.min === year && yearRange.max === year
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Custom range selection */}
      <div className="border-t border-gray-700 pt-3">
        <h4 className="text-white text-xs mb-2">Hoặc chọn khoảng năm:</h4>
        <div className="grid grid-cols-2 gap-4">
          {/* Min Year */}
          <div>
            <label className="block text-white text-xs mb-1">Từ năm</label>
            <select
              value={yearRange.min || ""}
              onChange={(e) =>
                handleMinYearChange(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="w-full px-2 py-1.5 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="">Tất cả</option>
              {Array.from({ length: currentYear - minYear + 1 }, (_, i) => {
                const year = currentYear - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Max Year */}
          <div>
            <label className="block text-white text-xs mb-1">Đến năm</label>
            <select
              value={yearRange.max || ""}
              onChange={(e) =>
                handleMaxYearChange(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="w-full px-2 py-1.5 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="">Tất cả</option>
              {Array.from({ length: currentYear - minYear + 1 }, (_, i) => {
                const year = currentYear - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Custom range indicator */}
        {yearRange.min && yearRange.max && yearRange.min !== yearRange.max && (
          <div className="mt-2">
            <span className="px-3 py-1.5 bg-yellow-500 text-black rounded-full text-xs font-medium">
              {yearRange.min} - {yearRange.max}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearFilter;
