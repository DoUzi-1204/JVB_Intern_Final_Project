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
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

      {/* Scanline / Pixel Grid Overlay */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.05) 0px,
              rgba(255,255,255,0.05) 1px,
              transparent 1px,
              transparent 3px
            ),
            repeating-linear-gradient(
              to right,
              rgba(255,255,255,0.05) 0px,
              rgba(255,255,255,0.05) 1px,
              transparent 1px,
              transparent 3px
            )
          `,
          backgroundSize: "10px 10px",
        }}
      ></div>

      {/* Extra overlay để chữ dễ đọc hơn */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default HeroSection;
