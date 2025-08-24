import React from "react";

const PageLoading = ({ message = "Đang tải..." }) => {
  return (
    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-40">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
        {message && <p className="mt-3 text-white">{message}</p>}
      </div>
    </div>
  );
};

export default PageLoading;
