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
      {/* Combined vignette: top, bottom, left, right (blurred, nhẹ) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            /* top (tối nhẹ phía trên) */
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 22%),
            /* bottom (tối nhẹ phía dưới) */
            linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 22%),
            /* left (tối hai bên) */
            linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 18%),
            /* right (tối hai bên) */
            linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 18%)
          `,
          filter: "blur(8px)", // blur mượt viền
          mixBlendMode: "overlay", // hòa nhẹ với ảnh
          opacity: 0.95,
        }}
      ></div>
    </div>
  );
};

export default HeroSection;
