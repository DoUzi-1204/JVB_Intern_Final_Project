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

  const handleCustomYearChange = (e) => {
    const year = e.target.value;
    if (year === "") {
      onChange(null);
    } else {
      const yearNumber = parseInt(year);
      if (!isNaN(yearNumber) && yearNumber >= 1900 && yearNumber <= currentYear) {
        onChange(yearNumber);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
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

      {/* Custom year input */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
        <span className="text-gray-400 text-xs">Hoặc nhập năm:</span>
        <input
          type="number"
          min="1900"
          max={currentYear}
          placeholder="Ví dụ: 1995"
          value={selectedYear || ""}
          onChange={handleCustomYearChange}
          className="w-24 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"
        />
        {selectedYear && !popularYears.includes(selectedYear) && (
          <span className="px-2 py-1 bg-yellow-500 text-black rounded text-xs font-medium">
            {selectedYear}
          </span>
        )}
      </div>
    </div>
  );
};

export default YearFilter;
