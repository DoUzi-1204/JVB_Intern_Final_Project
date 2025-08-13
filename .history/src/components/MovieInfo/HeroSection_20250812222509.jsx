const HeroSection = ({ movieData }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  const backdropUrl = movieData?.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movieData.backdrop_path}`
    : null;

  return (
    <div
      className="relative h-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: backdropUrl
          ? `url(${backdropUrl})`
          : "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        backgroundSize: "80px", // nhỏ để pixel to
        imageRendering: "pixelated",
      }}
    >
      {/* Gradient tối để đọc text rõ hơn */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

      {/* Lớp lưới pixel overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px", // kích thước ô vuông
        }}
      ></div>

      {/* Overlay phụ để giảm sáng */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default HeroSection;
