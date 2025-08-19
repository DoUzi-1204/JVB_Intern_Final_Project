import React, { useState } from "react";
import { FaFilm, FaImages } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BiMoviePlay } from "react-icons/bi";
import { MdRecommend } from "react-icons/md";

import EpisodeTab from "./EpisodeTab";
import GalleryTab from "./GalleryTab";
import TrailerTab from "./TrailerTab";
import CastTab from "./CastTab";
import RecommendTab from "./RecommendTab";

const NavButtons = ({
  movieData,
  credits,
  videos,
  images,
  recommendations,
  seasons,
  isMovie,
  movieId,
}) => {
  const [activeTab, setActiveTab] = useState("episodes");

  const tabs = [
    { id: "episodes", label: "Tập phim", icon: <FaFilm size={18} /> },
    { id: "gallery", label: "Hình ảnh", icon: <FaImages size={18} /> },
    { id: "trailers", label: "Trailer", icon: <BiMoviePlay size={19} /> },
    { id: "cast", label: "Diễn viên", icon: <FiUsers size={20} /> },
    {
      id: "recommendations",
      label: "Đề xuất",
      icon: <MdRecommend size={18} />,
    },
  ];

  const tabComponents = {
    episodes: (
      <EpisodeTab
        movieData={movieData}
        seasons={seasons}
        isMovie={isMovie}
        movieId={movieId}
      />
    ),
    gallery: <GalleryTab images={images} />,
    trailers: <TrailerTab videos={videos} />,
    cast: <CastTab credits={credits} />,
    recommendations: (
      <RecommendTab recommendations={recommendations} isMovie={isMovie} />
    ),
  };

  return (
    <div className="nav-tabs-container mt-5">
      {/* Navigation Buttons */}
      <div className="nav-tabs flex justify-center md:justify-start border-b border-gray-700 gap-0 md:gap-2 mb-7 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab flex items-center gap-2 px-2 md:px-4 py-3 border-b-2 transition-all duration-300 whitespace-nowrap text-sm font-medium ${
              activeTab === tab.id
                ? "border-yellow-300 text-yellow-300"
                : "border-transparent text-gray-200 hover:text-white hover:border-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="hidden md:inline-block">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabComponents[activeTab] || tabComponents.episodes}
      </div>
    </div>
  );
};

export default NavButtons;
