import React from "react";
import { FaPlay, FaPause, FaVolumeUp, FaExpand, FaCog } from "react-icons/fa";

const VideoPlayer = ({ movieData, isMovie, isTheaterMode, onTheaterModeToggle }) => {
  return (
    <div 
      className={`relative w-full aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
        isTheaterMode 
          ? 'fixed inset-0 z-50 bg-black rounded-none' 
          : 'bg-black'
      }`}
      onClick={isTheaterMode ? onTheaterModeToggle : undefined}
    >
      {/* Video Player Container */}
      <div className={`relative w-full h-full ${isTheaterMode ? 'flex items-center justify-center' : ''}`}>
        {/* Placeholder Video Player */}
        <div className={`bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center ${
          isTheaterMode 
            ? 'w-4/5 h-4/5 max-w-6xl max-h-96' 
            : 'w-full h-full'
        }`}>
          <div className="text-center">
            <FaPlay className="text-6xl text-white mb-4 mx-auto opacity-70" />
            <h3 className="text-xl text-white mb-2">
              {isMovie
                ? movieData?.title || movieData?.original_title
                : movieData?.name || movieData?.original_name}
            </h3>
            <p className="text-gray-300">
              Video player sẽ được tích hợp ở đây
              {isTheaterMode && (
                <span className="block mt-2 text-sm text-gray-400">
                  Nhấn vào vùng đen xung quanh để thoát chế độ rạp phim
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Video Controls Overlay */}
        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between"> */}
        {/* Left Controls */}
        {/* <div className="flex items-center space-x-4">
              <button className="text-white hover:text-yellow-400 transition-colors">
                <FaPlay className="text-xl" />
              </button>
              <button className="text-white hover:text-yellow-400 transition-colors">
                <FaVolumeUp className="text-xl" />
              </button>
              <div className="text-white text-sm">
                00:00 /{" "}
                {isMovie
                  ? `${Math.floor((movieData?.runtime || 0) / 60)}:${String(
                      (movieData?.runtime || 0) % 60
                    ).padStart(2, "0")}`
                  : "45:00"}
              </div>
            </div> */}

        {/* Right Controls */}
        {/* <div className="flex items-center space-x-4">
              <button className="text-white hover:text-yellow-400 transition-colors">
                <FaCog className="text-xl" />
              </button>
              <button className="text-white hover:text-yellow-400 transition-colors">
                <FaExpand className="text-xl" />
              </button>
            </div>
          </div> */}

        {/* Progress Bar */}
        {/* <div className="mt-2">
            <div className="w-full bg-gray-600 rounded-full h-1">
              <div
                className="bg-yellow-400 h-1 rounded-full"
                style={{ width: "25%" }}
              ></div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default VideoPlayer;
