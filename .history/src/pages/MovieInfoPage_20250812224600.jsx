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
      {/* Gradient từ trên xuống để làm tối */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* Vignette Effect - tối dần ở viền ảnh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      ></div>

      {/* Overlay phụ để chữ dễ đọc hơn */}
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
};

export default HeroSection;
