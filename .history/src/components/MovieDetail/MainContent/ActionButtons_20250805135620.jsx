import React from "react";
import { TiMediaPlay } from "react-icons/ti";
import { FaHeart, FaPlus, FaShare, FaComment, FaStar } from "react-icons/fa";

const ActionButtons = () => {
  const handleWatchNow = () => {
    console.log("Watch now clicked");
  };

  const handleFavorite = () => {
    console.log("Add to favorites");
  };

  const handleAddToList = () => {
    console.log("Add to list");
  };

  const handleShare = () => {
    console.log("Share movie");
  };

  const handleComment = () => {
    console.log("Comment on movie");
  };

  const handleRate = () => {
    console.log("Rate movie");
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Watch Now Button */}
      <button
        onClick={handleWatchNow}
        className="flex items-center gap-2 bg-gradient-to-r from-yellow-200 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-3 rounded-full transition-colors duration-200 font-semibold"
      >
        <TiMediaPlay className="text-xl" />
        Xem Ngay
      </button>

      {/* Action Buttons with Icons on top and text below */}
      <div className="flex gap-4">
        {/* Favorite */}
        <button
          onClick={handleFavorite}
          className="flex flex-col items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 group min-w-[80px]"
        >
          <FaHeart className="text-lg group-hover:text-red-500" />
          <span className="text-xs font-medium">Yêu thích</span>
        </button>

        {/* Add to List */}
        <button
          onClick={handleAddToList}
          className="flex flex-col items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 group min-w-[80px]"
        >
          <FaPlus className="text-lg group-hover:text-blue-500" />
          <span className="text-xs font-medium">Thêm vào</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 group min-w-[80px]"
        >
          <FaShare className="text-lg group-hover:text-green-500" />
          <span className="text-xs font-medium">Chia sẻ</span>
        </button>

        {/* Comment */}
        <button
          onClick={handleComment}
          className="flex flex-col items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 group min-w-[80px]"
        >
          <FaComment className="text-lg group-hover:text-yellow-500" />
          <span className="text-xs font-medium">Bình luận</span>
        </button>

        {/* Rate */}
        <button
          onClick={handleRate}
          className="flex flex-col items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 group min-w-[80px]"
        >
          <FaStar className="text-lg group-hover:text-yellow-400" />
          <span className="text-xs font-medium">Đánh giá</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
