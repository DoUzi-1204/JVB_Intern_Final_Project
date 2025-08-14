import React from "react";
import {
  FaHeart,
  FaPlus,
  FaShare,
  FaComment,
  FaFilm,
  FaExclamationTriangle,
  FaStar,
} from "react-icons/fa";

const VideoAction = () => {
  const actionButtons = [
    {
      icon: FaHeart,
      label: "Yêu thích",
      onClick: () => console.log("Yêu thích clicked"),
    },
    {
      icon: FaPlus,
      label: "Thêm vào",
      onClick: () => console.log("Thêm vào clicked"),
    },
    {
      icon: FaShare,
      label: "Chia sẻ",
      onClick: () => console.log("Chia sẻ clicked"),
    },
    {
      icon: FaComment,
      label: "Bình luận",
      onClick: () => console.log("Bình luận clicked"),
    },
    {
      icon: FaFilm,
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
    <div className="flex items-center justify-center space-x-8 py-4 bg-gray-900/50 rounded-lg mt-4">
      {actionButtons.map((button, index) => {
        const IconComponent = button.icon;
        return (
          <button
            key={index}
            onClick={button.onClick}
            className="flex flex-col items-center space-y-2 text-white hover:text-yellow-400 transition-colors group"
          >
            <div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors">
              <IconComponent className="text-lg" />
            </div>
            <span className="text-sm font-medium">{button.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default VideoAction;
