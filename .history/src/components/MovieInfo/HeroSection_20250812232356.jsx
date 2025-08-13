const HeroSection = ({ movieData }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  const backdropUrl = movieData?.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movieData.backdrop_path}`
    : null;

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: backdropUrl
          ? `url(${backdropUrl})`
          : "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      }}
    >
      {/* Dot Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px", // chỉnh kích thước grid
          zIndex: 1,
        }}
      ></div>

      {/* Vignette bốn phía */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 20%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%),
            linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 20%),
            linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 20%)
          `,
          zIndex: 2,
        }}
      ></div>
    </div>
  );
};

export default HeroSection;
