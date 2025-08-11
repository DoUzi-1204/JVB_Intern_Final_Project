import React from "react";

const HeroSection = ({ movieData, mediaType = "movie" }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  if (!movieData?.details) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const backdropUrl = movieData.details.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movieData.details.backdrop_path}`
    : "";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        {/* Gray vignette effect at edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 via-transparent to-gray-500/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-500/20 via-transparent to-gray-500/20"></div>
        {/* Soft edge blur effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroSection;
