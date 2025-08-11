import { FaPlay, FaHeart, FaShare, FaComment, FaStar } from "react-icons/fa";
import { HiMiniListBullet } from "react-icons/hi2";

const ActionButtons = ({ movieData = {}, mediaType = "movie" }) => {
  const handleWatchNow = () => {
    // Implement watch functionality
    console.log("Watch now clicked");
  };

  const handleFavorite = () => {
    // Implement favorite functionality
    console.log("Favorite clicked");
  };

  const handleAddToList = () => {
    // Implement add to list functionality
    console.log("Add to list clicked");
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Share clicked");
  };

  const handleComment = () => {
    // Implement comment functionality
    console.log("Comment clicked");
  };

  const handleRate = () => {
    // Implement rating functionality
    console.log("Rate clicked");
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      {/* Xem ngay button */}
      <button
        onClick={handleWatchNow}
        className="bg-gradient-to-r from-yellow-200 to-yellow-400 backdrop-blur-sm text-black px-6 py-3 rounded-full font-semibold text-sm flex items-center space-x-2 hover:from-yellow-400 hover:to-yellow-500 transition-colors"
      >
        <FaPlay className="w-4 h-4" />
        <span>Xem Ngay</span>
      </button>

      {/* Yêu thích */}
      <div
        className="flex flex-col items-center group cursor-pointer"
        onClick={handleFavorite}
      >
        <button className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white p-3 rounded-full transition-colors hover:text-yellow-300 group-hover:text-yellow-300">
          <FaHeart className="w-5 h-5" />
        </button>
        <span className="text-white text-xs mt-1 group-hover:text-yellow-300 transition-colors">
          Yêu thích
        </span>
      </div>

      {/* Thêm vào */}
      <div
        className="flex flex-col items-center group cursor-pointer"
        onClick={handleAddToList}
      >
        <button className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white p-3 rounded-full transition-colors hover:text-yellow-300 group-hover:text-yellow-300">
          <HiMiniListBullet className="w-5 h-5" />
        </button>
        <span className="text-white text-xs mt-1 group-hover:text-yellow-300 transition-colors">
          Thêm vào
        </span>
      </div>

      {/* Chia sẻ */}
      <div
        className="flex flex-col items-center group cursor-pointer"
        onClick={handleShare}
      >
        <button className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white p-3 rounded-full transition-colors hover:text-yellow-300 group-hover:text-yellow-300">
          <FaShare className="w-5 h-5" />
        </button>
        <span className="text-white text-xs mt-1 group-hover:text-yellow-300 transition-colors">
          Chia sẻ
        </span>
      </div>

      {/* Bình luận */}
      <div
        className="flex flex-col items-center group cursor-pointer"
        onClick={handleComment}
      >
        <button className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white p-3 rounded-full transition-colors hover:text-yellow-300 group-hover:text-yellow-300">
          <FaComment className="w-5 h-5" />
        </button>
        <span className="text-white text-xs mt-1 group-hover:text-yellow-300 transition-colors">
          Bình luận
        </span>
      </div>

      {/* Đánh giá */}
      <button
        onClick={handleRate}
        className="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold text-sm flex items-center space-x-2 hover:from-blue-700 hover:to-blue-900 transition-colors"
      >
        <FaStar className="w-4 h-4" />
        <span>{movieData.vi?.vote_average?.toFixed(1) || "N/A"}</span>
        <span className="text-xs">Đánh giá</span>
      </button>
    </div>
  );
};

export default ActionButtons;
