import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { FaPlay, FaHeart, FaStar, FaClock, FaCalendar } from "react-icons/fa";
import { HiMiniListBullet } from "react-icons/hi2";

const MovieInfoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes("/movie/");

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch movie/TV data
  useEffect(() => {
    const fetchData = async () => {
      if (!API_KEY || !id) return;

      setLoading(true);
      try {
        const mediaType = isMovie ? "movie" : "tv";

        // Fetch main data
        const [dataResponse, creditsResponse, recommendationsResponse] =
          await Promise.all([
            fetch(
              `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=vi-VN`
            ),
            fetch(
              `${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}&language=vi-VN`
            ),
            fetch(
              `${BASE_URL}/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=vi-VN`
            ),
          ]);

        const data = await dataResponse.json();
        const creditsData = await creditsResponse.json();
        const recommendationsData = await recommendationsResponse.json();

        setMovieData(data);
        setCredits(creditsData);
        setRecommendations(recommendationsData.results?.slice(0, 6) || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isMovie, API_KEY]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="text-white mt-4">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-white text-xl">Không tìm thấy thông tin phim</p>
          <Link
            to="/"
            className="text-yellow-400 hover:text-yellow-300 mt-4 inline-block"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = movieData.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movieData.backdrop_path}`
    : null;

  const posterUrl = movieData.poster_path
    ? `${IMAGE_BASE_URL}/w500${movieData.poster_path}`
    : null;

  const title = movieData.title || movieData.name;
  const releaseDate = movieData.release_date || movieData.first_air_date;
  const runtime =
    movieData.runtime ||
    (movieData.episode_run_time && movieData.episode_run_time[0]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Backdrop */}
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backdropUrl
            ? `url(${backdropUrl})`
            : "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {/* Poster */}
            <div className="lg:col-span-1">
              {posterUrl && (
                <img
                  src={posterUrl}
                  alt={title}
                  className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-2xl"
                />
              )}
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {title}
                </h1>

                {movieData.tagline && (
                  <p className="text-xl text-yellow-400 italic mb-4">
                    "{movieData.tagline}"
                  </p>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                {movieData.vote_average > 0 && (
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-lg font-semibold">
                      {movieData.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                )}

                {releaseDate && (
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-gray-400" />
                    <span>{new Date(releaseDate).getFullYear()}</span>
                  </div>
                )}

                {runtime && (
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    <span>{runtime} phút</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movieData.genres && movieData.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movieData.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-700/50 rounded-full text-sm border border-gray-600"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {movieData.overview && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Tóm tắt</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {movieData.overview}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {/* Watch Button */}
                <Link
                  to={`/${isMovie ? "movie" : "tv"}/${id}/watch`}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-3 rounded-full font-semibold text-lg flex items-center gap-3 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
                >
                  <FaPlay className="w-5 h-5" />
                  <span>Xem ngay</span>
                </Link>

                {/* Favorite Button */}
                <button className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold flex items-center gap-3 hover:bg-gray-500/50 transition-colors duration-300">
                  <FaHeart className="w-5 h-5" />
                  <span>Yêu thích</span>
                </button>

                {/* Add to List Button */}
                <button className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold flex items-center gap-3 hover:bg-gray-500/50 transition-colors duration-300">
                  <HiMiniListBullet className="w-5 h-5" />
                  <span>Danh sách</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {credits && credits.cast && credits.cast.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Diễn viên</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {credits.cast.slice(0, 12).map((actor) => (
              <div key={actor.id} className="text-center">
                <div className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden mb-3">
                  {actor.profile_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-sm mb-1">{actor.name}</h4>
                <p className="text-gray-400 text-xs">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Có thể bạn quan tâm</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {recommendations.map((item) => (
              <Link
                key={item.id}
                to={`/${isMovie ? "movie" : "tv"}/${item.id}`}
                className="group"
              >
                <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  {item.poster_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}/w300${item.poster_path}`}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-sm group-hover:text-yellow-400 transition-colors">
                  {item.title || item.name}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInfoPage;
