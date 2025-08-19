import React from "react";
import { FaPlay, FaPause, FaVolumeUp, FaExpand, FaCog } from "react-icons/fa";

const VideoPlayer = ({ movieData, isMovie }) => {
  return (
    <div className="relative w-full aspect-video bg-black">
      {/* Video Player Container */}
      <div className="relative w-full h-full">
        {/* Placeholder Video Player */}
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <FaPlay className="text-6xl text-white mb-4 mx-auto opacity-70" />
            <h3 className="text-xl text-white mb-2">
              {isMovie
                ? movieData?.title || movieData?.original_title
                : movieData?.name || movieData?.original_name}
            </h3>
            <p className="text-gray-300">Video player sẽ được tích hợp ở đây</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
