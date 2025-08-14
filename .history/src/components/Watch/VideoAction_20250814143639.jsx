import React from "react";
import { FaExclamationTriangle, FaStar } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineLightBulb } from "react-icons/hi2";

const VideoAction = () => {
  const actionButtons = [
    { icon: IoMdHeart, label: "Yêu thích" },
    { icon: MdFormatListBulletedAdd, label: "Thêm vào" },
    { icon: IoShareSocialOutline, label: "Chia sẻ" },
    { icon: TfiCommentAlt, label: "Bình luận" },
    { icon: HiOutlineLightBulb, label: "Rạp phim" },
    { icon: FaExclamationTriangle, label: "Báo lỗi" },
    { icon: FaStar, label: "Đánh giá" },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-4 py-4 bg-gray-900/50 rounded-lg mt-4">
      {actionButtons.map((button, index) => {
        const IconComponent = button.icon;
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
