// import React from "react";
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
    <div className="flex items-center gap-3">
      {/* Main Watch Button */}
      <Link
        to={`/${isMovie ? "movie" : "tv"}/${movieId}/watch`}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <FaPlay className="w-4 h-4" />
        <span>Xem ngay</span>
      </Link>

      {/* Action Buttons */}
      <button
        onClick={handleFavorite}
        className="p-2 bg-gray-800/50 hover:bg-red-600/80 rounded-full transition-all duration-300 group"
        title="Yêu thích"
      >
        <FaHeart className="w-4 h-4 text-white" />
      </button>

      <button
        onClick={handleAddToList}
        className="p-2 bg-gray-800/50 hover:bg-blue-600/80 rounded-full transition-all duration-300 group"
        title="Thêm vào danh sách"
      >
        <FaPlus className="w-4 h-4 text-white" />
      </button>

      <button
        onClick={handleShare}
        className="p-2 bg-gray-800/50 hover:bg-green-600/80 rounded-full transition-all duration-300 group"
        title="Chia sẻ"
      >
        <FaShare className="w-4 h-4 text-white" />
      </button>

      <button
        onClick={handleComment}
        className="p-2 bg-gray-800/50 hover:bg-purple-600/80 rounded-full transition-all duration-300 group"
        title="Bình luận"
      >
        <FaComment className="w-4 h-4 text-white" />
      </button>

      <button
        onClick={handleRating}
        className="p-2 bg-gray-800/50 hover:bg-yellow-400/80 rounded-full transition-all duration-300 group"
        title="Đánh giá phim"
      >
        <FaStar className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

export default ActionButtons;
