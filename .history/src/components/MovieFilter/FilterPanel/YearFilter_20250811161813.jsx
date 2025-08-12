const YearFilter = ({ yearRange, onChange }) => {
  const currentYear = new Date().getFullYear();
  const minYear = 1900;

  const handleMinYearChange = (year) => {
    onChange({
      ...yearRange,
      min: year,
    });
  };

  const handleMaxYearChange = (year) => {
    onChange({
      ...yearRange,
      max: year,
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold text-lg">Năm phát hành</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Min Year */}
        <div>
          <label className="block text-white text-sm mb-2">Từ năm</label>
          <select
            value={yearRange.min || ""}
            onChange={(e) => handleMinYearChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
          <label className="block text-white text-sm mb-2">Đến năm</label>
          <select
            value={yearRange.max || ""}
            onChange={(e) => handleMaxYearChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
    </div>
  );
};

export default YearFilter;
