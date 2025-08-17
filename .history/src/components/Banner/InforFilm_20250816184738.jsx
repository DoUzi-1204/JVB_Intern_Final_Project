import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { TiMediaPlay } from "react-icons/ti";
import Image404 from "./404Image";

const InforFilm = ({
  currentMovie,
  currentDetails,
  currentDetailsEn,
  getMovieLogo,
  getCertification,
  formatRuntime,
  formatReleaseYear,
}) => {
  return (
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
          {(currentDetails?.vote_average || currentMovie.vote_average)?.toFixed(
            1
          )}
        </span>

        <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-black px-2 py-1 rounded text-xs font-medium">
          {getCertification()}
        </span>

        <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
          {formatReleaseYear(
            currentDetails?.release_date || currentMovie.release_date
          )}
        </span>

        <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
          {formatRuntime(currentDetails?.runtime)}
        </span>
      </div>

      {/* Genres */}
      {currentDetails?.genres?.length > 0 && (
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
        <Link
          to={`/movie/${currentMovie.id}/watch`}
          className="bg-gradient-to-r from-yellow-100 to-yellow-400 backdrop-blur-sm text-black px-6 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-colors flex items-center space-x-2"
        >
          <TiMediaPlay className="w-6 h-6" />
          <span>Xem phim</span>
        </Link>

        <Link
          to={`/movie/${currentMovie.id}`}
          className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 hover:text-yellow-300"
        >
          <FaCircleInfo className="w-6 h-6 transition-colors" />
          <span>Chi tiết</span>
        </Link>

        <div className="relative group">
          <button className="border border-white/50 w-12 h-12 bg-gray-600/50 backdrop-blur-sm text-white rounded-full transition-colors flex items-center justify-center group-hover:text-yellow-300">
            <FaHeart className=" text-base transition-colors" />
          </button>
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Yêu thích
          </span>
        </div>

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
  );
};

export default InforFilm;
