import { TiMediaPlay } from "react-icons/ti";
import { FaHeart, FaPlus, FaShare, FaComment, FaStar } from "react-icons/fa";

const ActionButtons = () => {
  const handleWatchNow = () => {
    // Implement watch functionality
    console.log("Xem ngay clicked");
  };

  const handleFavorite = () => {
    // Implement favorite functionality
    console.log("Yêu thích clicked");
  };

  const handleAddToList = () => {
    // Implement add to list functionality
    console.log("Thêm vào danh sách clicked");
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Chia sẻ clicked");
  };

  const handleComment = () => {
    // Implement comment functionality
    console.log("Bình luận clicked");
  };

  const handleRate = () => {
    // Implement rating functionality
    console.log("Đánh giá clicked");
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6">
      {/* Watch Now Button */}
      <div className="mb-6">
        <button
          onClick={handleWatchNow}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <TiMediaPlay className="text-xl" />
          Xem ngay
        </button>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Favorite */}
        <button
          onClick={handleFavorite}
          className="flex flex-col items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-white"
        >
          <FaHeart className="text-xl text-red-500" />
          <span className="text-xs">Yêu thích</span>
        </button>

        {/* Add to List */}
        <button
          onClick={handleAddToList}
          className="flex flex-col items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-white"
        >
          <FaPlus className="text-xl text-blue-500" />
          <span className="text-xs">Thêm vào</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-white"
        >
          <FaShare className="text-xl text-green-500" />
          <span className="text-xs">Chia sẻ</span>
        </button>

        {/* Comment */}
        <button
          onClick={handleComment}
          className="flex flex-col items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-white"
        >
          <FaComment className="text-xl text-purple-500" />
          <span className="text-xs">Bình luận</span>
        </button>
      </div>

      {/* Rating Button */}
      <div className="mt-4">
        <button
          onClick={handleRate}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <FaStar className="text-lg" />
          Đánh giá
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;