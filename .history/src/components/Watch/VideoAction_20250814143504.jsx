import React from "react";
import { FaExclamationTriangle, FaStar, FaRegLightbulb } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";

const VideoAction = () => {
  const actionButtons = [
    {
      icon: IoMdHeart,
      label: "Yêu thích",
      onClick: () => console.log("Yêu thích clicked"),
    },
    {
      icon: MdFormatListBulletedAdd,
      label: "Thêm vào",
      onClick: () => console.log("Thêm vào clicked"),
    },
    {
      icon: IoShareSocialOutline,
      label: "Chia sẻ",
      onClick: () => console.log("Chia sẻ clicked"),
    },
    {
      icon: TfiCommentAlt,
      label: "Bình luận",
      onClick: () => console.log("Bình luận clicked"),
    },
    {
      icon: FaRegLightbulb,
      label: "Rạp phim",
      onClick: () => console.log("Rạp phim clicked"),
    },
    {
      icon: FaExclamationTriangle,
      label: "Báo lỗi",
      onClick: () => console.log("Báo lỗi clicked"),
    },
    {
      icon: FaStar,
      label: "Đánh giá",
      onClick: () => console.log("Đánh giá clicked"),
    },
  ];

  return (
    <div className="flex items-center justify-center space-x-6 py-4 bg-gray-900/50 rounded-lg mt-4">
      {actionButtons.map((button, index) => {
        const IconComponent = button.icon;
        return (
          <button
            key={index}
            onClick={button.onClick}
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-800/50"
          >
            <IconComponent className="text-lg" />
            này
            <span className="text-sm font-medium">{button.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default VideoAction;
