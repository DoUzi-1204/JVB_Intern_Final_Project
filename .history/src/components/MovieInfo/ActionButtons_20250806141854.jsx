// import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaPlus, FaShare, FaComment, FaStar } from "react-icons/fa";
import { TiMediaPlay } from "react-icons/ti";

const ActionButtons = ({ isMovie, movieId }) => {
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
    <div className="flex items-center gap-10">
      {/* Main Watch Button */}
      <Link
        to={`/${isMovie ? "movie" : "tv"}/${movieId}/watch`}
        className="bg-gradient-to-r from-yellow-500 to-yellow-100 backdrop-blur-sm text-black px-5 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-colors flex items-center space-x-1"
      >
        <TiMediaPlay className="w-6 h-6" />
        <span className="text-base">Xem phim</span>
      </Link>

      {/* Action Buttons */}
      <div className="flex flex-col items-center space-y-3">
        <button
          onClick={handleFavorite}
          className="flex flex-col items-center group"
          title="Yêu thích"
        >
          <div className="p-3 bg-gray-800/50 rounded-full group-hover:bg-gray-700 transition-all duration-300">
            <FaHeart className="w-6 h-6 text-white group-hover:text-yellow-400" />
          </div>
          <span className="mt-1 text-sm text-white group-hover:text-yellow-400">
            Yêu thích
          </span>
        </button>

        <button
          onClick={handleAddToList}
          className="flex flex-col items-center group"
          title="Thêm vào danh sách"
        >
          <div className="p-3 bg-gray-800/50 rounded-full group-hover:bg-gray-700 transition-all duration-300">
            <FaPlus className="w-6 h-6 text-white group-hover:text-yellow-400" />
          </div>
          <span className="mt-1 text-sm text-white group-hover:text-yellow-400">
            Thêm vào danh sách
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center group"
          title="Chia sẻ"
        >
          <div className="p-3 bg-gray-800/50 rounded-full group-hover:bg-gray-700 transition-all duration-300">
            <FaShare className="w-6 h-6 text-white group-hover:text-yellow-400" />
          </div>
          <span className="mt-1 text-sm text-white group-hover:text-yellow-400">
            Chia sẻ
          </span>
        </button>

        <button
          onClick={handleComment}
          className="flex flex-col items-center group"
          title="Bình luận"
        >
          <div className="p-3 bg-gray-800/50 rounded-full group-hover:bg-gray-700 transition-all duration-300">
            <FaComment className="w-6 h-6 text-white group-hover:text-yellow-400" />
          </div>
          <span className="mt-1 text-sm text-white group-hover:text-yellow-400">
            Bình luận
          </span>
        </button>
      </div>

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
