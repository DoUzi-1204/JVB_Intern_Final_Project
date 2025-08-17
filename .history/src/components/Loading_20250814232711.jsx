import React from "react";

const Loading = ({ message = "Đang tải..." }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-orange-400 rounded-full animate-ping mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
