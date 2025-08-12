const ActionButtons = ({ onApplyFilters, onClearFilters, onClose }) => {
  return (
    <div className="pt-1 px-40">
      <div className="flex gap-3 justify-start">
        <button
          onClick={onApplyFilters}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Lọc phim
        </button>

        <button
          onClick={onClearFilters}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200"
        >
          Xóa bộ lọc
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200"
          >
            Đóng
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
