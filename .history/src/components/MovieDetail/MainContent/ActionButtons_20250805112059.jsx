import { TiMediaPlay } from "react-icons/ti";
import { FaHeart, FaPlus, FaShare, FaComment, FaStar } from "react-icons/fa";

const ActionButtons = () => {
  return (
    <div className="flex items-center gap-4 p-6">
      {/* Xem Ngay Button */}
      <button className="bg-gradient-to-r from-yellow-100 to-yellow-400 backdrop-blur-sm text-black px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-colors flex items-center space-x-2">
        <TiMediaPlay className="w-6 h-6" />
        <span>Xem Ngay</span>
      </button>

      {/* Icon Buttons with Labels */}
      <div className="flex items-center gap-6">
        {/* Yêu thích */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="w-12 h-12 bg-gray-600/50 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors">
            <FaHeart className="w-5 h-5" />
          </div>
          <span className="text-white text-xs mt-2 group-hover:text-yellow-300 transition-colors">
            Yêu thích
          </span>
        </div>

        {/* Thêm vào */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="w-12 h-12 bg-gray-600/50 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors">
            <FaPlus className="w-5 h-5" />
          </div>
          <span className="text-white text-xs mt-2 group-hover:text-yellow-300 transition-colors">
            Thêm vào
          </span>
        </div>

        {/* Chia sẻ */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="w-12 h-12 bg-gray-600/50 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors">
            <FaShare className="w-5 h-5" />
          </div>
          <span className="text-white text-xs mt-2 group-hover:text-yellow-300 transition-colors">
            Chia sẻ
          </span>
        </div>

        {/* Bình luận */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="w-12 h-12 bg-gray-600/50 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors">
            <FaComment className="w-5 h-5" />
          </div>
          <span className="text-white text-xs mt-2 group-hover:text-yellow-300 transition-colors">
            Bình luận
          </span>
        </div>

        {/* Đánh giá */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="w-12 h-12 bg-gray-600/50 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors">
            <FaStar className="w-5 h-5" />
          </div>
          <span className="text-white text-xs mt-2 group-hover:text-yellow-300 transition-colors">
            Đánh giá
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
