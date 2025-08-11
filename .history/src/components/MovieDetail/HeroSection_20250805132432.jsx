import useMovieDetail from '../../hooks/useMovieDetail';

const HeroSection = () => {
  const { movieData, loading } = useMovieDetail();

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  if (loading) {
    return (
      <div className="relative w-full h-[70vh] bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
    );
  }

  const backdropUrl = movieData?.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movieData.backdrop_path}`
    : null;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Backdrop Image */}
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={movieData?.title || movieData?.name}
          className="w-full h-full object-cover"
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      {/* Additional bottom gradient for better text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default HeroSection;