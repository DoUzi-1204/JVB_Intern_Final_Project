import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import VideoPlayer from "../components/Watch/VideoPlayer";
import VideoAction from "../components/Watch/VideoAction";
import VideoInfo from "../components/Watch/VideoInfo";
import EpisodeTab from "../components/MovieInfo/NavigationTabs/EpisodeTab";
import Trending from "../components/Trending/Trending";
import useMovieDetail from "../hooks/useMovieDetail";

const WatchPage = () => {
  const { id, season, episode } = useParams();
  const location = useLocation();

  // Determine if it's a movie or TV series based on URL structure
  // Handle both new format (/watch/movie/id) and legacy format (/movie/id/watch)
  const isMovie = (() => {
    if (
      location.pathname.includes("/watch/movie/") ||
      (location.pathname.includes("/movie/") &&
        location.pathname.includes("/watch"))
    ) {
      return true;
    }
    if (
      location.pathname.includes("/watch/tv/") ||
      (location.pathname.includes("/tv/") &&
        location.pathname.includes("/watch"))
    ) {
      return false;
    }
    // Fallback: if no season/episode, assume movie
    return !season || !episode;
  })();

  const { movieData, seasons, loading, error } = useMovieDetail(id, isMovie);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 flex items-center justify-center h-screen">
          <div className="text-white text-xl">Đang tải...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 flex items-center justify-center h-screen">
          <div className="text-red-500 text-xl">Có lỗi xảy ra: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="pt-30 ">
        {/* Watch Player Section */}
        <div className="w-full h-auto object-cover px-7 ">
          <div className="bg-black rounded-lg overflow-hidden">
            <VideoPlayer movieData={movieData} isMovie={isMovie} />
            <VideoAction />
          </div>
        </div>

        {/* Watch Container */}
        <div className="container mx-auto  py-6">
          <div className="flex space-x-1">
            {/* Main Content (2/3) */}
            <div className="flex-1 w-2/3 space-y-2">
              {/* Video Info */}
              <VideoInfo movieData={movieData} isMovie={isMovie} />

              {/* Episodes */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <EpisodeTab
                  movieData={movieData}
                  seasons={seasons}
                  isMovie={isMovie}
                  movieId={id}
                />
              </div>
            </div>

            {/* Sidebar (1/3) */}
            <div className="w-1/3">
              <div className="bg-gray-900/50 rounded-lg p-6 sticky top-24">
                <Trending />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WatchPage;
