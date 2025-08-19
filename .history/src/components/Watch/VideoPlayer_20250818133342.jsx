import React from "react";
import { FaPlay, FaPause, FaVolumeUp, FaExpand, FaCog } from "react-icons/fa";

const VideoPlayer = ({ movieData, isMovie }) => {
  return (
    <div className="relative w-full aspect-video bg-black">
      {/* Video Player Container */}
      <div className="relative w-full ">
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
