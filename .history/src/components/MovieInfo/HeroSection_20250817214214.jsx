import Image404 from "../404Image";

const HeroSection = ({ movieData }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  const backdropUrl = movieData?.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movieData.backdrop_path}`
    : null;

  return (
    <div className="relative w-full">
      {/* Background Image (giữ tỉ lệ gốc) */}
      <Image404
        src={backdropUrl}
        alt={movieData?.title || movieData?.name || "Movie backdrop"}
        className="w-full h-auto object-cover"
        type="backdrop"
      />

      {/* Dot Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 0.25px, transparent 1px)`,
          backgroundSize: "3px 3px",
          zIndex: 1,
        }}
      />

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
      />
    </div>
  );
};

export default HeroSection;
