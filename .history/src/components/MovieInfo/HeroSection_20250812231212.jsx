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
      {/* Vignette mờ viền trên & dưới */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4) 100%),
            linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 20%),
            linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 20%)
          `,
          filter: "blur(12px)",
        }}
      ></div>
    </div>
  );
};

export default HeroSection;
