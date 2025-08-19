import React from "react";
import { FaExclamationTriangle, FaStar } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { GiFilmProjector } from "react-icons/gi";
import { IoChatboxEllipses } from "react-icons/io5";

const VideoAction = ({ onRatingClick }) => {
  const normalButtons = [
    { icon: IoMdHeart, label: "Yêu thích" },
    { icon: MdFormatListBulletedAdd, label: "Thêm vào" },
    { icon: IoShareSocialOutline, label: "Chia sẻ" },
    { icon: IoChatboxEllipses, label: "Bình luận" },
    { icon: GiFilmProjector, label: "Rạp phim" },
    { icon: FaExclamationTriangle, label: "Báo lỗi" },
  ];

  return (
    <div className="flex items-center justify-between py-3 bg-gray-900/50 px-4">
      {/* Left side - Normal buttons */}
      <div className="flex items-center flex-wrap gap-4">
        {normalButtons.map((button, index) => {
          const IconComponent = button.icon;
          return (
            <button
              key={index}
              onClick={() => console.log(`${button.label} clicked`)}
              className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-800/50"
            >
              <IconComponent size={20} />
              <span className="text-sm font-medium">{button.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right side - Rating button */}
      <div>
        <button
          onClick={onRatingClick}
          className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-800 to-cyan-600 rounded-full hover:brightness-110 transition-all duration-300"
          title="Đánh giá phim"
        >
          <FaStar className="w-5 h-5 text-white" />
          <span className="text-white underline text-sm">Đánh giá</span>
        </button>
      </div>
    </div>
  );
};

export default VideoAction;
