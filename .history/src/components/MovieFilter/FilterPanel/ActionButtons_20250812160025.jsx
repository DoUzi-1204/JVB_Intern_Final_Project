import { FaArrowRight } from "react-icons/fa6";

const ActionButtons = ({ onApplyFilters, onClearFilters }) => {
  return (
    <div className="pt-1 px-36">
      <div className="flex gap-3 justify-start">
        {/* Nút lọc kết quả */}
        <button
          onClick={onApplyFilters}
          className="bg-gradient-to-r from-yellow-400 to-orange-300 hover:from-yellow-500 hover:to-orange-600 text-black font-medium py-2.5 px-4 rounded-3xl transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          Lọc kết quả
          <FaArrowRight className="text-black" />
        </button>

        {/* Nút xóa bộ lọc */}
        <button
          onClick={onClearFilters}
          className="border border-gray-300 hover:bg-gray-500 text-white font-medium py-2.5 px-4 rounded-3xl transition-colors duration-200"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
