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
        <div className="w-full h-full bg-gray-900" />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>
  );
};

export default HeroSection;
