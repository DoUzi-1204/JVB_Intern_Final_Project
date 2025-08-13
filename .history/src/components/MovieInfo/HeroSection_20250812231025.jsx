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
      {/* Overlay Gradient từ trên xuống */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Vignette mờ hai bên */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.45) 100%)",
          filter: "blur(20px)",
        }}
      ></div>
    </div>
  );
};

export default HeroSection;
