import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoPlayer from "../components/Watch/VideoPlayer";
import VideoAction from "../components/Watch/VideoAction";
import VideoInfo from "../components/Watch/VideoInfo";
import EpisodeTab from "../components/MovieInfo/NavigationTabs/EpisodeTab";
import RecommendedMovies from "../components/Watch/RecommendedMovies";
import useMovieDetail from "../hooks/useMovieDetail";

const WatchPage = () => {
  const { id, season, episode } = useParams();
  
  // Determine if it's a movie or TV series based on URL structure
  const isMovie = !season || !episode;
  
  const { 
    movieData, 
    seasons, 
    recommendations, 
    loading, 
    error 
  } = useMovieDetail(id, isMovie);

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
      
      <div className="pt-20">
        {/* Watch Player Section */}
        <div className="container mx-auto px-4 py-6">
          <VideoPlayer movieData={movieData} type={type} />
          <VideoAction />
        </div>

        {/* Watch Container */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex space-x-6">
            {/* Main Content (2/3) */}
            <div className="flex-1 w-2/3 space-y-6">
              {/* Video Info */}
              <VideoInfo movieData={movieData} type={type} />
              
              {/* Episodes */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <EpisodeTab 
                  movieData={movieData}
                  seasons={seasons}
                  isMovie={type === 'movie'}
                  movieId={id}
                />
              </div>
            </div>

            {/* Sidebar (1/3) */}
            <div className="w-1/3">
              <div className="bg-gray-900/50 rounded-lg p-6 sticky top-24">
                <RecommendedMovies 
                  recommendations={recommendations}
                  type={type}
                />
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
