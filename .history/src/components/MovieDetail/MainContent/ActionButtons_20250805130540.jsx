import { TiMediaPlay } from "react-icons/ti";
import { FaHeart, FaPlus, FaShare, FaComment, FaStar } from "react-icons/fa";

const ActionButtons = ({ movieData = {} }) => {
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
    <div className="flex-1 bg-gray-800 rounded-lg p-6">
      {/* Watch Now Button */}
      <div className="mb-6">
        <button
          onClick={handleWatchNow}
          className="bg-gradient-to-r from-yellow-100 to-yellow-400 backdrop-blur-sm text-black px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-colors flex items-center space-x-2 w-full justify-center"
        >
          <TiMediaPlay className="w-6 h-6" />
          <span>Xem Ngay</span>
        </button>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Favorite Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleFavorite}
            className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors mb-2"
          >
            <FaHeart className="w-6 h-6" />
          </button>
          <span className="text-white text-xs text-center">Yêu thích</span>
        </div>

        {/* Add to List Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleAddToList}
            className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors mb-2"
          >
            <FaPlus className="w-6 h-6" />
          </button>
          <span className="text-white text-xs text-center">Thêm vào</span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleShare}
            className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors mb-2"
          >
            <FaShare className="w-6 h-6" />
          </button>
          <span className="text-white text-xs text-center">Chia sẻ</span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleComment}
            className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white hover:text-yellow-300 transition-colors mb-2"
          >
            <FaComment className="w-6 h-6" />
          </button>
          <span className="text-white text-xs text-center">Bình luận</span>
        </div>
      </div>

      {/* Rating Button */}
      <div className="mt-6">
        <button
          onClick={handleRate}
          className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg py-3 flex items-center justify-center space-x-2 text-white hover:text-yellow-300 transition-colors"
        >
          <FaStar className="w-5 h-5" />
          <span>Đánh giá</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
