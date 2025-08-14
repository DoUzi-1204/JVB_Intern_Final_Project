import React from "react";
import { API_CONFIG, getCountryName } from "../../utils/constants";
import Image404 from "../404Image";

const VideoInfo = ({ movieData, credits, isMovie }) => {
  const IMAGE_BASE_URL = API_CONFIG.IMAGE_BASE_URL;

  // Get certification
  const getCertification = () => {
    if (!movieData?.certifications) return "NR";

    const certData = isMovie
      ? movieData.certifications.results
      : movieData.certifications.results;

    const usCert = certData?.find((item) => item.iso_3166_1 === "US");

    if (usCert) {
      const cert = isMovie
        ? usCert.release_dates?.[0]?.certification
        : usCert.rating;
      return cert || "NR";
    }
    return "NR";
  };

  // Helper functions
  const getGenres = () => {
    if (!movieData?.genres || movieData.genres.length === 0) {
      return "Đang cập nhật";
    }
    return movieData.genres.map((genre) => genre.name).join(", ");
  };

  const getReleaseYear = () => {
    const date = isMovie
      ? movieData?.release_date
      : movieData?.first_air_date;
    return date ? new Date(date).getFullYear() : "Đang cập nhật";
  };

  const getRating = () => {
    return movieData?.vote_average
      ? movieData.vote_average.toFixed(1)
      : "Đang cập nhật";
  };

  const getSeasonInfo = () => {
    if (!isMovie && movieData?.number_of_seasons) {
      return `${movieData.number_of_seasons} mùa`;
    }
    return null;
  };

  const getMainCast = () => {
    if (!credits?.cast) return "Đang cập nhật";
    return credits.cast
      .slice(0, 3)
      .map((actor) => actor.name)
      .join(", ");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gray-900 p-6 rounded-lg">
      {/* Poster - Left */}
      <div className="lg:col-span-3">
        <div className="aspect-[2/3] rounded-lg overflow-hidden">
          {movieData?.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}/w500${movieData.poster_path}`}
              alt={isMovie ? movieData.title : movieData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image404 className="w-full h-full" />
          )}
        </div>
      </div>

      {/* Movie Info - Center */}
      <div className="lg:col-span-6 space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isMovie ? movieData?.title : movieData?.name}
          </h1>
          {movieData?.tagline && (
            <p className="text-gray-400 italic text-lg mb-3">
              {movieData.tagline}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div>
              <span className="text-gray-400 block">Thể loại:</span>
              <span className="text-white">{getGenres()}</span>
            </div>
            
            <div>
              <span className="text-gray-400 block">Năm phát hành:</span>
              <span className="text-white">{getReleaseYear()}</span>
            </div>

            <div>
              <span className="text-gray-400 block">Đánh giá:</span>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-semibold">
                  ⭐ {getRating()}
                </span>
                <span className="text-gray-400">/10</span>
              </div>
            </div>

            {getSeasonInfo() && (
              <div>
                <span className="text-gray-400 block">Số mùa:</span>
                <span className="text-white">{getSeasonInfo()}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-gray-400 block">Phân loại:</span>
              <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded">
                {getCertification()}
              </span>
            </div>

            <div>
              <span className="text-gray-400 block">Diễn viên chính:</span>
              <span className="text-white">{getMainCast()}</span>
            </div>

            <div>
              <span className="text-gray-400 block">Trạng thái:</span>
              <span className="text-green-400">
                {isMovie ? "Hoàn thành" : movieData?.status || "Đang cập nhật"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview - Right */}
      <div className="lg:col-span-3">
        <div className="bg-gray-800 p-4 rounded-lg h-full">
          <h3 className="text-lg font-semibold text-white mb-3">Tóm tắt</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {movieData?.overview || "Đang cập nhật thông tin tóm tắt."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
