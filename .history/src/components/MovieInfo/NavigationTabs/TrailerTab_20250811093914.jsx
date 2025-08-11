import React, { useState } from "react";

const TrailerTab = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!videos || !videos.results || videos.results.length === 0) {
    return (
      <div className="trailer-tab-container">
        <h3 className="text-lg font-medium text-white mb-6 text-left">
          Trailer
        </h3>
        <p className="text-gray-400">Chưa có trailer nào.</p>
      </div>
    );
  }

  // Since useMovieDetail already filters for "Official Trailer" videos,
  // we just need to display them
  const allVideos = videos.results || [];

  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const getVideoThumbnail = (videoKey) => {
    return `https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg`;
  };

  const formatPublishedDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="trailer-tab-container">
      <h3 className="text-lg font-medium text-white mb-6 text-left">Trailer</h3>

      {allVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allVideos.map((video, index) => (
            <div
              key={`${video.key}-${index}`}
              className="video-card bg-gray-800 rounded-lg overflow-hidden cursor-pointer group hover:bg-gray-700 transition-all duration-300"
              onClick={() => openVideoModal(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative">
                <img
                  src={getVideoThumbnail(video.key)}
                  alt={video.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl ml-1">▶️</span>
                  </div>
                </div>

                {/* Video Type Badge */}
                <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  {video.type}
                </div>

                {/* Language Badge */}
                {video.iso_639_1 && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
                    {video.iso_639_1}
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  {video.name}
                </h4>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>YouTube</span>
                  {video.published_at && (
                    <span>{formatPublishedDate(video.published_at)}</span>
                  )}
                </div>
                {video.size && (
                  <div className="mt-1 text-xs text-gray-400">
                    Chất lượng: {video.size}p
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Đang cập nhật</p>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-2xl bg-red-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors duration-300 z-10"
            >
              ✕
            </button>

            {/* Video Player */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0`}
                title={selectedVideo.name}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onClick={(e) => e.stopPropagation()}
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-semibold mb-2">
                {selectedVideo.name}
              </h3>
              <div className="flex justify-center gap-4 text-sm text-gray-300">
                <span>Loại: {selectedVideo.type}</span>
                <span>Ngôn ngữ: {selectedVideo.iso_639_1?.toUpperCase()}</span>
                {selectedVideo.size && (
                  <span>Chất lượng: {selectedVideo.size}p</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailerTab;
