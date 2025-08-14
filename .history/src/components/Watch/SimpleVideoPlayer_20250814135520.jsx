import React from "react";

const SimpleVideoPlayer = ({ title = "Video Player" }) => {
  return (
    <div className="relative bg-black rounded-lg overflow-hidden min-h-[50vh] flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-400">Video player coming soon...</p>
      </div>
    </div>
  );
};

export default SimpleVideoPlayer;
