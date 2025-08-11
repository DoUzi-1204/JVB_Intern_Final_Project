import { Link } from "react-router-dom";
import {
  FaPlay,
  FaHeart,
  FaPlus,
  FaShare,
  FaComment,
  FaStar,
} from "react-icons/fa";

const ActionButtons = ({ movieData, isMovie, movieId }) => {
  const handleFavorite = () => {
    // Logic yêu thích
    console.log("Thêm vào yêu thích");
  };

  const handleAddToList = () => {
    // Logic thêm vào danh sách
    console.log("Thêm vào danh sách");
  };

  const handleShare = () => {
    // Logic chia sẻ
    console.log("Chia sẻ phim");
  };

  const handleComment = () => {
    // Logic bình luận
    console.log("Mở bình luận");
  };

  const handleRating = () => {
    // Logic đánh giá
    console.log("Đánh giá phim");
  };

  return (
    <div className="space-y-6">
      {/* Main Watch Button */}
      <div>
        <Link
          to={`/${isMovie ? "movie" : "tv"}/${movieId}/watch`}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaPlay className="w-5 h-5" />
          <span>Xem ngay</span>
        </Link>
      </div>

      {/* Secondary Action Buttons */}
      <div className="grid grid-cols-4 gap-4">
        {/* Yêu thích */}
        <button
          onClick={handleFavorite}
          className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300 group"
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
            <FaHeart className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Yêu thích</span>
        </button>

        {/* Thêm vào danh sách */}
        <button
          onClick={handleAddToList}
          className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300 group"
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
            <FaPlus className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Thêm vào</span>
        </button>

        {/* Chia sẻ */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300 group"
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
            <FaShare className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Chia sẻ</span>
        </button>

        {/* Bình luận */}
        <button
          onClick={handleComment}
          className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300 group"
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
            <FaComment className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Bình luận</span>
        </button>
      </div>

      {/* Rating Button */}
      <div>
        <button
          onClick={handleRating}
          className="w-full border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:bg-yellow-400 hover:text-black transition-all duration-300"
        >
          <FaStar className="w-5 h-5" />
          <span>Đánh giá phim</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
