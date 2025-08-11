import React, { useState } from "react";

const GalleryTab = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || (!images.backdrops?.length && !images.posters?.length)) {
    return (
      <div className="gallery-tab-container">
        <h3 className="text-xl font-bold text-yellow-400 mb-6">Hình ảnh</h3>
        <p className="text-gray-400">Chưa có hình ảnh nào.</p>
      </div>
    );
  }

  // Filter images to only include Vietnamese and English, then limit to 5 images each
  const filteredBackdrops =
    images.backdrops
      ?.filter(
        (img) =>
          !img.iso_639_1 || img.iso_639_1 === "vi" || img.iso_639_1 === "en"
      )
      .slice(0, 5) || [];

  const filteredPosters =
    images.posters
      ?.filter(
        (img) =>
          !img.iso_639_1 || img.iso_639_1 === "vi" || img.iso_639_1 === "en"
      )
      .slice(0, 5) || [];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  return (
    <div className="gallery-tab-container">
      <h3 className="text-xl font-bold text-yellow-400 mb-6 text-left">
        Hình ảnh
      </h3>

      {/* Combined Gallery Section */}
      {(filteredBackdrops.length > 0 || filteredPosters.length > 0) && (
        <div className="mb-8">
          {/* Backdrop Images */}
          {filteredBackdrops.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBackdrops.map((image, index) => (
                  <div
                    key={`backdrop-${index}`}
                    className="relative cursor-pointer group overflow-hidden rounded-lg aspect-video"
                    onClick={() => openModal({ ...image, type: "backdrop" })}
                  >
                    <img
                      src={`${IMAGE_BASE_URL}/w500${image.file_path}`}
                      alt={`Backdrop ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        🔍
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Poster Images */}
          {filteredPosters.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredPosters.map((image, index) => (
                  <div
                    key={`poster-${index}`}
                    className="relative cursor-pointer group overflow-hidden rounded-lg aspect-[2/3]"
                    onClick={() => openModal({ ...image, type: "poster" })}
                  >
                    <img
                      src={`${IMAGE_BASE_URL}/w342${image.file_path}`}
                      alt={`Poster ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        🔍
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-2xl max-h-[80vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all duration-300 z-10"
            >
              ✕
            </button>
            <img
              src={`${IMAGE_BASE_URL}/original${selectedImage.file_path}`}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg">
              <span className="text-sm">
                {selectedImage.type === "backdrop" ? "Hình nền" : "Poster"} •
                {selectedImage.width}×{selectedImage.height}
                {selectedImage.iso_639_1 &&
                  ` • ${selectedImage.iso_639_1.toUpperCase()}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;
