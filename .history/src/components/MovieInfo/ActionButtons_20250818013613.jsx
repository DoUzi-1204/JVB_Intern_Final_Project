// import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { TiMediaPlay } from "react-icons/ti";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";

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
    <div className="flex flex-col md:flex-row items-center gap-5">
      {/* Layout responsive cho nút */}
      <div className="flex flex-col md:flex-row gap-3 w-full">
        {/* Nút Xem ngay */}
        <div className="order-1 md:order-none w-full md:w-auto">
          <Link
            to={`/${isMovie ? "movie" : "tv"}/${movieId}/watch`}
            className="bg-gradient-to-r from-yellow-500 to-yellow-100 backdrop-blur-sm text-black px-5 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-colors flex items-center space-x-1 w-full"
          >
            <TiMediaPlay className="w-6 h-6" />
            <span className="text-lg">Xem ngay</span>
          </Link>
        </div>

        {/* Các nút khác */}
        <div className="order-2 md:order-none flex flex-row gap-3 w-full md:w-auto mt-3 md:mt-0">
          <button
            onClick={handleFavorite}
            className="flex flex-col items-center text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <IoMdHeart className="w-5 h-5 mb-1" />
            <span className="text-sm font-normal">Yêu thích</span>
          </button>

          <button
            onClick={handleAddToList}
            className="flex flex-col items-center text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <MdFormatListBulletedAdd className="w-5 h-5 mb-1" />
            <span className="text-sm font-normal">Thêm</span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <IoShareSocialOutline className="w-5 h-5 mb-1" />
            <span className="text-sm font-normal">Chia sẻ</span>
          </button>

          <button
            onClick={handleComment}
            className="flex flex-col items-center text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:text-yellow-400"
          >
            <TfiCommentAlt className="w-5 h-5 mb-1" />
            <span className="text-sm font-normal">Bình luận</span>
          </button>

          <button
            onClick={handleRating}
            className="flex items-center gap-3 px-5 py-0 bg-gradient-to-r from-blue-800 to-cyan-600 rounded-full hover:brightness-110 transition-all duration-300"
            title="Đánh giá phim"
          >
            <FaStar className="w-5 h-5 text-white" />
            <span className="text-white underline text-base">Đánh giá</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
