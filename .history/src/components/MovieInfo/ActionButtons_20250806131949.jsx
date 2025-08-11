import React from "react";
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

  return (
    <div className="space-y-6">
      {/* Main Watch Button */}
      <div>
        <Link
          to={`/${isMovie ? "movie" : "tv"}/${movieId}/watch`}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-3 rounded-full font-bold text-base flex items-center justify-center gap-3 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaPlay className="w-4 h-4" />
          <span>Xem Ngay</span>
        </Link>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between">
        {/* Yêu thích */}
        <button
          onClick={handleFavorite}
          className="flex flex-col items-center gap-1 p-3 hover:bg-gray-800/30 rounded-lg transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-red-600/80 transition-all duration-300">
            <FaHeart className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Yêu thích</span>
        </button>

        {/* Thêm vào */}
        <button
          onClick={handleAddToList}
          className="flex flex-col items-center gap-1 p-3 hover:bg-gray-800/30 rounded-lg transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-blue-600/80 transition-all duration-300">
            <FaPlus className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Thêm vào</span>
        </button>

        {/* Chia sẻ */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 p-3 hover:bg-gray-800/30 rounded-lg transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-green-600/80 transition-all duration-300">
            <FaShare className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Chia sẻ</span>
        </button>

        {/* Bình luận */}
        <button
          onClick={handleComment}
          className="flex flex-col items-center gap-1 p-3 hover:bg-gray-800/30 rounded-lg transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-purple-600/80 transition-all duration-300">
            <FaComment className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-xs font-medium">Bình luận</span>
        </button>
      </div>

      {/* Rating Display */}
      {movieData?.vote_average > 0 && (
        <div className="flex items-center justify-end">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
            <FaStar className="w-3 h-3 text-yellow-400" />
            <span>{movieData.vote_average.toFixed(1)}</span>
            <span className="text-xs opacity-80">Đánh giá</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;

export default ActionButtons;
