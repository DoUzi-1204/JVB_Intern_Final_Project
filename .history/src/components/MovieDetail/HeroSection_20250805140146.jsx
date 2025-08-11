import React from "react";
import useMovieDetail from "../../hooks/useMovieDetail";

const HeroSection = () => {
  const { loading, getBackdropUrl } = useMovieDetail();

  if (loading) {
    return (
      <div className="relative w-full h-screen bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
    );
  }

  const backdropUrl = getBackdropUrl();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Backdrop Image */}
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt="Movie Backdrop"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      )}
      
      {/* Multiple Gradient Overlays for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default HeroSection;
