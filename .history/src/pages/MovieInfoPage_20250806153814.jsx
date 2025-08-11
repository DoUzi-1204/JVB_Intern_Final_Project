import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import useMovieDetail from "../hooks/useMovieDetail";
import HeroSection from "../components/MovieInfo/HeroSection";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import ActionButtons from "../components/MovieInfo/ActionButtons";

const MovieInfoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes("/movie/");

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Use custom hook for data fetching
  const { movieData, credits, loading, error } = useMovieDetail(id, isMovie);

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

  if (error || !movieData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-white text-xl">
            {error ? `Lỗi: ${error}` : "Không tìm thấy thông tin phim"}
          </p>
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Backdrop */}
      <HeroSection movieData={movieData} />

      {/* Detail Container - Overlapping the backdrop */}
      <div className="detailcontainer relative -mt-80 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Sidebar - 1/3 width */}
            <div className="sidebar lg:col-span-1">
              <MovieInfo
                movieData={movieData}
                credits={credits}
                isMovie={isMovie}
              />
            </div>

            {/* Main Detail - 2/3 width */}
            <div className="maindetail lg:col-span-2">
              <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
                <ActionButtons
                  movieData={movieData}
                  isMovie={isMovie}
                  movieId={id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default MovieInfoPage;
