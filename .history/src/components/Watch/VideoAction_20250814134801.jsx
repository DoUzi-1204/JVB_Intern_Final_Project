import React from "react";
import { FaStar, FaFlag, FaTheaterMasks } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";

const VideoAction = () => {
  const handleFavorite = () => {
    console.log("Thêm vào yêu thích");
  };

  const handleAddToList = () => {
    console.log("Thêm vào danh sách");
  };

  const handleShare = () => {
    console.log("Chia sẻ phim");
  };

  const handleComment = () => {
    console.log("Mở bình luận");
  };

  const handleRating = () => {
    console.log("Đánh giá phim");
  };

  const handleTheaterMode = () => {
    console.log("Chế độ rạp phim");
  };

  const handleReportError = () => {
    console.log("Báo lỗi");
  };

  return (
    <div className="bg-gray-900 px-6 py-4 rounded-b-lg">
      <div className="flex items-center justify-between">
        {/* Left Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleFavorite}
            className="flex flex-col items-center text-white px-3 py-2 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <IoMdHeart className="w-5 h-5 mb-1" />
            <span className="text-xs font-normal">Yêu thích</span>
          </button>

          <button
            onClick={handleAddToList}
            className="flex flex-col items-center text-white px-3 py-2 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <MdFormatListBulletedAdd className="w-5 h-5 mb-1" />
            <span className="text-xs font-normal">Thêm</span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center text-white px-3 py-2 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <IoShareSocialOutline className="w-5 h-5 mb-1" />
            <span className="text-xs font-normal">Chia sẻ</span>
          </button>

          <button
            onClick={handleComment}
            className="flex flex-col items-center text-white px-3 py-2 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <TfiCommentAlt className="w-5 h-5 mb-1" />
            <span className="text-xs font-normal">Bình luận</span>
          </button>

          <button
            onClick={handleTheaterMode}
            className="flex flex-col items-center text-white px-3 py-2 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <FaTheaterMasks className="w-5 h-5 mb-1" />
            <span className="text-xs font-normal">Rạp phim</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleReportError}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300"
          >
            <FaFlag className="w-4 h-4" />
            <span className="text-sm">Báo lỗi</span>
          </button>

          <button
            onClick={handleRating}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 rounded-lg transition-all duration-300"
          >
            <FaStar className="w-4 h-4" />
            <span className="text-sm">Đánh giá</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoAction;
