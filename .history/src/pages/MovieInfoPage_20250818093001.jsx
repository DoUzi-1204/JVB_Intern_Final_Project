import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import useMovieDetail from "../hooks/useMovieDetail";
import HeroSection from "../components/MovieInfo/HeroSection";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import Trending from "../components/Trending/Trending";
import ActionButtons from "../components/MovieInfo/ActionButtons";
import NavButtons from "../components/MovieInfo/NavigationTabs/NavButtons";
import CommentSection from "../components/Comments/CommentSection";

const MovieInfoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes("/movie/");

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Use custom hook for data fetching
  const {
    movieData,
    credits,
    videos,
    images,
    recommendations,
    seasons,
    loading,
    error,
  } = useMovieDetail(id, isMovie);

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
    <div className="min-h-screen bg-zinc-800 text-white">
      {/* Hero Section with Backdrop */}
      <HeroSection movieData={movieData} />

      {/* Detail Container - Overlapping the backdrop */}
      <div className="detailcontainer relative -mt-52 lg:-mt-56 xl:-mt-72 z-10 ">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1  lg:grid-cols-3 gap-0">
            {/* Sidebar - 1/3 width */}
            <div className="sidebar lg:col-span-1 flex flex-col gap-6">
              <MovieInfo
                movieData={movieData}
                credits={credits}
                isMovie={isMovie}
              />
              <div className="hidden lg:block">
                <Trending />
              </div>
            </div>

            {/* Main Detail - 2/3 width */}
            <div className="maindetail lg:col-span-2">
              <div className="bg-gray-900/95 backdrop-blur-sm rounded-3xl py-3 px-6 lg:p-6 shadow-2xl">
                <ActionButtons
                  movieData={movieData}
                  isMovie={isMovie}
                  movieId={id}
                />

                {/* Navigation Tabs */}
                <NavButtons
                  movieData={movieData}
                  credits={credits}
                  videos={videos}
                  images={images}
                  recommendations={recommendations}
                  seasons={seasons}
                  isMovie={isMovie}
                  movieId={id}
                />
                {/* Thêm phần bình luận dưới tabs */}
                <CommentSection isLoggedIn={false} />

                {/* Additional Content Sections */}
                {/* <div className="mt-8 space-y-8"> */}
                {/* Cast Section */}
                {/* {credits && credits.cast && credits.cast.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-yellow-400">
                        Diễn viên chính
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {credits.cast.slice(0, 8).map((actor) => (
                          <div key={actor.id} className="text-center group">
                            <div className="w-full h-32 bg-gray-800 rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                              {actor.profile_path ? (
                                <img
                                  src={https://image.tmdb.org/t/p/w185${actor.profile_path}}
                                  alt={actor.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            <h4 className="font-semibold text-sm mb-1 text-white group-hover:text-yellow-400 transition-colors">
                              {actor.name}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {actor.character}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div> */}
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
