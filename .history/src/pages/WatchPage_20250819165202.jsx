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
import CommentSection from "../components/Comments/CommentSection";

import RatingSection from "../components/Rating/RatingSection";
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
  const [showRating, setShowRating] = React.useState(false);
  })();

  const { movieData, seasons } = useMovieDetail(id, isMovie);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
      {showRating && (
        <RatingSection
          movieName={movieData?.title || movieData?.name}
          rating={movieData?.vote_average || 0}
          ratingCount={movieData?.vote_count || 0}
          onClose={() => setShowRating(false)}
        />
      )}

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-32 ">
        {/* Watch Player Section */}
            <VideoAction onRatingClick={() => setShowRating(true)} />
          <div className="bg-black  overflow-hidden">
            <VideoPlayer movieData={movieData} isMovie={isMovie} />
            <VideoAction />
          </div>
        </div>

        {/* Watch Container */}
        <div className="w-full h-auto object-cover py-6 px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Main Content (2/3) */}
            <div className="lg:col-span-2 space-y-1">
              {/* Episodes */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <EpisodeTab
                  movieData={movieData}
                  seasons={seasons}
                  isMovie={isMovie}
                  movieId={id}
                />
              </div>
              {/* Video Info */}
              <VideoInfo movieData={movieData} isMovie={isMovie} />

              {/* Comment */}
              <div className="bg-gray-900/50 rounded-lg px-6">
                <CommentSection isLoggedIn={false} />
              </div>
            </div>

            {/* Sidebar (1/3) */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 rounded-lg p-0 lg:sticky lg:top-24">
                <Trending />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
