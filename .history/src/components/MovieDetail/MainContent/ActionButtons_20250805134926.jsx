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
    <div className="flex gap-4 mb-6">
      {/* Watch Now Button */}
      <button
        onClick={handleWatchNow}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
      >
        <TiMediaPlay className="text-xl" />
        Xem Ngay
      </button>

      {/* Icon Buttons */}
      <div className="flex gap-3">
        {/* Favorite */}
        <button
          onClick={handleFavorite}
          className="flex flex-col items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
        >
          <FaHeart className="text-white text-lg group-hover:text-red-500" />
        </button>

        {/* Add to List */}
        <button
          onClick={handleAddToList}
          className="flex flex-col items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
        >
          <FaPlus className="text-white text-lg group-hover:text-blue-500" />
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
        >
          <FaShare className="text-white text-lg group-hover:text-green-500" />
        </button>

        {/* Comment */}
        <button
          onClick={handleComment}
          className="flex flex-col items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
        >
          <FaComment className="text-white text-lg group-hover:text-yellow-500" />
        </button>

        {/* Rate */}
        <button
          onClick={handleRate}
          className="flex flex-col items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
        >
          <FaStar className="text-white text-lg group-hover:text-yellow-400" />
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
