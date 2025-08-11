const HeroSection = ({ backdropUrl }) => {
  if (!backdropUrl) {
    return (
      <div className="relative h-screen w-full bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {/* Gradient overlays for better content readability */}
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
