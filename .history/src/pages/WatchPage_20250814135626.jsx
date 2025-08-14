import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useMovieDetail from "../hooks/useMovieDetail";
import SimpleVideoPlayer from "../components/Watch/SimpleVideoPlayer";
import VideoAction from "../components/Watch/VideoAction";
import VideoInfo from "../components/Watch/VideoInfo";
import EpisodeTab from "../components/MovieInfo/NavigationTabs/EpisodeTab";
import RecommendedMovies from "../components/Watch/RecommendedMovies";

const WatchPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes('/movie/');

  console.log('WatchPage mounted:', { id, pathname: location.pathname, isMovie });

  const {
    movieData,
    credits,
    seasons,
    recommendations,
    loading,
    error,
  } = useMovieDetail(id, isMovie);

  // Debug logging
  console.log('WatchPage Debug:', { id, isMovie, movieData, loading, error });

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  console.log('WatchPage rendering:', { loading, error, hasMovieData: !!movieData });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Đang tải thông tin phim...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Có lỗi xảy ra</h1>
            <p className="text-gray-400 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Debug info: ID={id}, isMovie={isMovie ? 'true' : 'false'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy phim</h1>
            <p className="text-gray-400">Phim với ID {id} không tồn tại</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="container mx-auto px-4 pb-8">
        {/* Watch Player Section */}
        <div className="mb-8">
          <div className="bg-black rounded-lg overflow-hidden">
            {movieData ? (
              <>
                <SimpleVideoPlayer 
                  title={isMovie ? movieData?.title : movieData?.name}
                />
                <VideoAction />
              </>
            ) : (
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <p className="text-white">Loading video player...</p>
              </div>
            )}
          </div>
        </div>

        {/* Watch Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - Left (2/3) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Video Info */}
            <VideoInfo 
              movieData={movieData}
              credits={credits}
              isMovie={isMovie}
            />

            {/* Episode Tab - Only for TV Series */}
            {!isMovie && (
              <div className="bg-gray-900 rounded-lg p-6">
                <EpisodeTab
                  movieData={movieData}
                  seasons={seasons}
                  isMovie={isMovie}
                  movieId={id}
                />
              </div>
            )}
          </div>

          {/* Sidebar - Right (1/3) */}
          <div className="lg:col-span-4">
            <RecommendedMovies 
              recommendations={recommendations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
