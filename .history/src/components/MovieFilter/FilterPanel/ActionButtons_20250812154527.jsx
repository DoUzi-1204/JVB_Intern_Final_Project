import { FaArrowRight } from "react-icons/fa6";

const ActionButtons = ({ onApplyFilters, onClearFilters }) => {
  return (
    <div className="pt-1 px-36">
      <div className="flex gap-3 justify-start">
        <button
          onClick={onApplyFilters}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center gap-2"
        >
          Lọc kết quả
          <FaArrowRight className="text-black" />
        </button>

        <button
          onClick={onClearFilters}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
