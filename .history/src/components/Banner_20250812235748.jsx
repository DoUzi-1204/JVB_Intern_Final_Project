import useBanner from "../hooks/useBanner";
import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
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
    fetchMovieDetails,
    fetchMovieDetailsEn,
    fetchMovieImages,
  ]);

  // ...existing code...
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
