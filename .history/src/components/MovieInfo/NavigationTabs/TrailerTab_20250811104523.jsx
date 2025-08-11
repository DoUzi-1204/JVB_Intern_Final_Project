import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";

const TrailerTab = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const hasVideos = videos?.results?.length > 0;
  const allVideos = videos?.results || [];

  const openVideoModal = (video) => setSelectedVideo(video);
  const closeModal = () => setSelectedVideo(null);
  const getVideoThumbnail = (videoKey) => 
    `https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg`;

  return (
    <div className="trailer-tab-container">
      <h3 className="text-lg font-medium text-white mb-6 text-left">Trailer</h3>

      {!hasVideos ? (
        <p className="text-gray-400">Đang cập nhật</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allVideos.map((video, index) => (
            <div
              key={`${video.key}-${index}`}
              className="cursor-pointer group"
              onClick={() => openVideoModal(video)}
            >
              {/* Video Thumbnail Card */}
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 mb-3">
                <div className="relative">
                  <img
                    src={getVideoThumbnail(video.key)}
                    alt={video.name}
                    className="w-full h-48 object-cover transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <FaYoutube className="text-white text-4xl group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {video.type}
                  </div>
                  {video.iso_639_1 && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
                      {video.iso_639_1}
                    </div>
                  )}
                </div>
              </div>

              {/* Video Info */}
              <div className="px-1">
                <h4 className="text-gray-200 font-medium text-sm mb-1 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  {video.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-2xl bg-red-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors duration-300 z-10"
            >
              ✕
            </button>

            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0`}
                title={selectedVideo.name}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailerTab;
