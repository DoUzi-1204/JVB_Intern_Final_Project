import useBanner from "../hooks/useBanner";
import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { TiMediaPlay } from "react-icons/ti";
const Banner = () => {
  const {
    movies,
    currentMovie,
    setCurrentMovie,
    movieDetails,
    movieDetailsEn,
    movieImages,
    loading,
    error,
    IMAGE_BASE_URL,
  } = useBanner();

  const getMovieLogo = () => {
    const currentImages = movieImages[currentMovie?.id];
    if (!currentImages?.logos) return null;

    // Try to find Vietnamese logo first
    let logo = currentImages.logos.find((logo) => logo.iso_639_1 === "vi");

    // If no Vietnamese logo, try English
    if (!logo) {
      logo = currentImages.logos.find((logo) => logo.iso_639_1 === "en");
    }

    // If still no logo, get the first one
    if (!logo && currentImages.logos.length > 0) {
      logo = currentImages.logos[0];
    }

    return logo ? `${IMAGE_BASE_URL}/w500${logo.file_path}` : null;
  };

  const getCertification = () => {
    const currentDetails = movieDetails[currentMovie?.id];
    if (!currentDetails?.release_dates?.results) return "NR";

    const usRelease = currentDetails.release_dates.results.find(
      (release) => release.iso_3166_1 === "US"
    );
    if (usRelease && usRelease.release_dates.length > 0) {
      return usRelease.release_dates[0].certification || "NR";
    }
    return "NR";
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  };

  const formatReleaseYear = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : "";
  };

  const currentDetails = movieDetails[currentMovie?.id];
  const currentDetailsEn = movieDetailsEn[currentMovie?.id];

  if (error) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Configuration Error</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (loading || !currentMovie) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const backdropUrl = currentMovie?.backdrop_path
    ? `${IMAGE_BASE_URL}/original${currentMovie.backdrop_path}`
    : "";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Gray vignette effect at edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 via-transparent to-gray-500/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-500/20 via-transparent to-gray-500/20"></div>

        {/* Soft edge blur effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

        {/* Dot Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#000 0.05px, transparent 1px)`,
            backgroundSize: "3px 3px",
            zIndex: 1,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 flex items-center justify-between h-full">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl space-y-3 text-left">
            {/* Movie Logo */}
            {getMovieLogo() && (
              <div className="mb-2 w-96 h-28 flex items-center justify-start">
                <img
                  src={getMovieLogo()}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            {/* English Title */}
            {currentDetailsEn?.title && (
              <h2 className="text-lg text-yellow-300 font-light mb-4 text-left">
                {currentDetailsEn.title}
              </h2>
            )}

            {/* Movie Info */}
            <div className="flex items-center space-x-2 text-white">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-normal backdrop-blur-sm">
                TMDB{" "}
                {(
                  currentDetails?.vote_average || currentMovie.vote_average
                )?.toFixed(1)}
              </span>

              {/* Certification */}
              <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-black px-2 py-1 rounded text-xs font-medium">
                {getCertification()}
              </span>

              {/* Release Year */}
              <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
                {formatReleaseYear(
                  currentDetails?.release_date || currentMovie.release_date
                )}
              </span>

              {/* Runtime */}
              <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
                {formatRuntime(currentDetails?.runtime)}
              </span>
            </div>
            {/* Genres */}
            {currentDetails?.genres && currentDetails.genres.length > 0 && (
              <div className="text-left">
                <div className="flex flex-wrap gap-2">
                  {currentDetails.genres.slice(0, 5).map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Overview */}
            <p className="text-white text-sm font-normal leading-relaxed max-w-xl text-left line-clamp-3">
              {currentDetails?.overview || currentMovie.overview}
            </p>
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Xem phim - Dẫn đến WatchPage */}
              <Link
                to={`/movie/${currentMovie.id}/watch`}
                className="bg-gradient-to-r from-yellow-100 to-yellow-400 backdrop-blur-sm text-black px-6 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-colors flex items-center space-x-2"
              >
                <TiMediaPlay className="w-6 h-6" />
                <span>Xem phim</span>
              </Link>

              {/* Chi tiết - Dẫn đến MovieDetail */}
              <Link
                to={`/movie/${currentMovie.id}`}
                className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 hover:text-yellow-300"
              >
                <FaCircleInfo className="w-6 h-6 transition-colors" />
                <span>Chi tiết</span>
              </Link>

              {/* Yêu thích - Giữ nguyên button */}
              <div className="relative group">
                <button className="border border-white/50 w-12 h-12 bg-gray-600/50 backdrop-blur-sm text-white rounded-full transition-colors flex items-center justify-center group-hover:text-yellow-300">
                  <FaHeart className=" text-base transition-colors" />
                </button>
                <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Yêu thích
                </span>
              </div>

              {/* Thêm vào danh sách - Giữ nguyên button */}
              <div className="relative group">
                <button className="border border-white/50 w-12 h-12 bg-gray-600/50 backdrop-blur-sm text-white rounded-full transition-colors flex items-center justify-center group-hover:text-yellow-300">
                  <MdFormatListBulletedAdd className="w-6 h-6 text-2xl transition-colors" />
                </button>
                <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Thêm vào danh sách
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Movie Posters */}
          <div className="hidden lg:flex flex-col space-y-3 absolute bottom-8 right-8">
            <div className="flex space-x-3">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className={`cursor-pointer transition-all duration-300 transform rounded-lg ${
                    currentMovie.id === movie.id
                      ? "scale-125 ring-2 ring-white"
                      : "scale-100 hover:scale-110"
                  }`}
                  onClick={() => setCurrentMovie(movie)}
                >
                  <img
                    src={`${IMAGE_BASE_URL}/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
