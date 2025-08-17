import React from 'react';

const Loading = ({ message = "Đang tải..." }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-orange-400 rounded-full animate-ping mx-auto"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-white text-lg font-medium mb-2">
          {message}
        </div>
        
        {/* Dots animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Additional loading bar */}
        <div className="mt-6 w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;