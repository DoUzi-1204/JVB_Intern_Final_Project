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
      {/* Gradient từ trên xuống mờ dần */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent"></div>

      {/* Gradient hiện tại từ dưới lên */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

      {/* Overlay phụ để tăng độ tối nhẹ */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default HeroSection;
