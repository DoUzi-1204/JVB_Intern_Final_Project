import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Simple spinner */}
        <div className="w-12 h-12 border-3 border-gray-600 border-t-yellow-400 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
