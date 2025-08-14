import React from "react";
import { FaExclamationTriangle, FaStar } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";
import { GiFilmProjector } from "react-icons/gi";

const VideoAction = () => {
  const actionButtons = [
    { icon: IoMdHeart, label: "Yêu thích", type: "normal" },
    { icon: MdFormatListBulletedAdd, label: "Thêm vào", type: "normal" },
    { icon: IoShareSocialOutline, label: "Chia sẻ", type: "normal" },
    { icon: TfiCommentAlt, label: "Bình luận", type: "normal" },
    { icon: GiFilmProjector, label: "Rạp phim", type: "normal" },
    { icon: FaExclamationTriangle, label: "Báo lỗi", type: "normal" },
    { icon: FaStar, label: "Đánh giá", type: "special" },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-4 py-4 bg-gray-900/50 rounded-lg mt-4">
      {actionButtons.map((button, index) => {
        const IconComponent = button.icon;
        
        // Special styling for rating button
        if (button.type === "special") {
          return (
            <button
              key={index}
              onClick={() => console.log(`${button.label} clicked`)}
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-800 to-cyan-600 rounded-full hover:brightness-110 transition-all duration-300"
              title="Đánh giá phim"
            >
              <IconComponent className="w-5 h-5 text-white" />
              <span className="text-white underline text-sm">{button.label}</span>
            </button>
          );
        }
        
        // Normal styling for other buttons
        return (
          <button
            key={index}
            onClick={() => console.log(`${button.label} clicked`)}
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-800/50"
          >
            <IconComponent size={20} /> {/* Icon đồng bộ 20px */}
            <span className="text-sm font-medium">{button.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default VideoAction;
