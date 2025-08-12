const YearFilter = ({ yearRange, onChange }) => {
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
  ].filter((year, index, self) => self.indexOf(year) === index && year <= currentYear)
   .sort((a, b) => b - a);

  const handleYearToggle = (year) => {
    // Nếu năm đã được chọn, bỏ chọn
    if (yearRange.min === year && yearRange.max === year) {
      onChange({ min: null, max: null });
    } else {
      // Chọn năm cụ thể
      onChange({ min: year, max: year });
    }
  };

  const handleSelectAll = () => {
    onChange({ min: null, max: null });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-white font-medium text-sm mb-3">Năm sản xuất:</h3>
      <div className="flex flex-wrap gap-2">
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
        
        {/* Custom range indicator */}
        {yearRange.min && yearRange.max && yearRange.min !== yearRange.max && (
          <span className="px-3 py-1.5 bg-yellow-500 text-black rounded-full text-xs font-medium">
            {yearRange.min} - {yearRange.max}
          </span>
        )}
      </div>
    </div>
  );
};

export default YearFilter;
