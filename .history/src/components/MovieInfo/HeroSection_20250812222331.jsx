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
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,${btoa(`
            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
              <filter id='n' x='0' y='0'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/>
              </filter>
              <rect width='100%' height='100%' filter='url(#n)' opacity='0.15'/>
            </svg>
          `)}")`,
          backgroundRepeat: "repeat",
          opacity: 0.15,
          mixBlendMode: "overlay",
        }}
      ></div>
    </div>
  );
};

export default HeroSection;
