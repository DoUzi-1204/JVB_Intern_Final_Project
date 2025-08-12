const ActionButtons = ({ onApplyFilters, onClearFilters }) => {
  return (
    <div className="pt-1 px-36">
      <div className="flex gap-3 justify-start ">
        <button
          onClick={onApplyFilters}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-4 rounded-md border-0 outline-none transition-all duration-200 flex items-center gap-2 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5 2C5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Lọc kết quả
        </button>

        <button
          onClick={onClearFilters}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-md border-0 outline-none transition-all duration-200 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
