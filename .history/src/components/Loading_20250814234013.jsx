import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          {/* Main spinning ring */}
          <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
          {/* Secondary slower spinning ring */}
          <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-b-orange-400 rounded-full animate-spin mx-auto" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
