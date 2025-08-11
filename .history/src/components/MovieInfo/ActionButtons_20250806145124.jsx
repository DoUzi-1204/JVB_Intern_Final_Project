// import React from "react";
import { Link } from "react-router-dom";
import { FaComment, FaStar } from "react-icons/fa";
import { TiMediaPlay } from "react-icons/ti";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";

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
    <div className="flex items-center gap-7">
      {/* Main Watch Button */}
      <Link
        to={`/${isMovie ? "movie" : "tv"}/${movieId}/watch`}
        className="bg-gradient-to-r from-yellow-500 to-yellow-100 backdrop-blur-sm text-black px-5 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-colors flex items-center space-x-1"
      >
        <TiMediaPlay className="w-6 h-6" />
        <span className="text-base">Xem phim</span>
      </Link>

      {/* Action Buttons */}
      <button
        onClick={handleFavorite}
        className="flex flex-col items-center text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-gray-600 hover:text-yellow-400"
      >
        <IoMdHeart className="w-5 h-5 mb-1" />
        <span className="text-sm font-medium">Yêu thích</span>
      </button>

      <button
        onClick={handleAddToList}
        className="flex flex-col items-center text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-gray-600 hover:text-yellow-400"
      >
        <MdFormatListBulletedAdd className="w-5 h-5 mb-1" />
        <span className="text-sm font-medium">Thêm</span>
      </button>

      <button
        onClick={handleShare}
        className="flex flex-col items-center text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-gray-600 hover:text-yellow-400"
      >
        <IoShareSocialOutline className="w-5 h-5 mb-1" />
        <span className="text-sm font-medium">Chia sẻ</span>
      </button>

      <button
        onClick={handleComment}
        className="flex flex-col items-center text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-gray-600 hover:text-yellow-400"
      >
        <FaComment className="w-5 h-5 mb-1" />
        <span className="text-sm font-medium">Bình luận</span>
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
