import Image404 from "../404Image";

const HeroSection = ({ movieData }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  const backdropUrl = movieData?.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movieData.backdrop_path}`
    : null;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image (full screen) */}
      <Image404
        src={backdropUrl}
        alt={movieData?.title || movieData?.name || "Movie backdrop"}
        className="absolute inset-0 w-full h-full object-cover"
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
