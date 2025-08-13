import { FaArrowRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const ActionButtons = ({ onApplyFilters, onClearFilters, onClose }) => {
  return (
    <div className="pt-1 px-36">
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          {/* Nút lọc kết quả */}
          <button
            onClick={onApplyFilters}
            className="bg-gradient-to-r from-yellow-400 to-orange-300 hover:from-yellow-500 hover:to-orange-600 text-black font-medium text-sm py-2.5 px-4 rounded-3xl transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            Lọc kết quả
            <FaArrowRight className="text-black" />
          </button>

          {/* Nút xóa bộ lọc */}
          <button
            onClick={onClearFilters}
            className="border border-gray-200 hover:bg-gray-800 text-white font-medium text-sm  py-2.5 px-4 rounded-3xl transition-colors duration-200"
          >
            Xóa bộ lọc
          </button>
        </div>

        {/* Nút đóng - căn phải */}
        <button
          onClick={onClose}
          className="border border-gray-200 hover:bg-gray-800 text-white hover:text-white font-medium text-sm  py-2.5 px-4 rounded-3xl transition-colors duration-200"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
