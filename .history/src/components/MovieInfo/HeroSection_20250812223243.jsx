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
      {/* Overlay: Trên rõ, dưới mờ */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>

      {/* Overlay phụ (nếu muốn tăng độ tương phản) */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}
    </div>
  );
};

export default HeroSection;
