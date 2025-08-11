import React, { useState } from 'react';
import EpisodeTab from './EpisodeTab';
import GalleryTab from './GalleryTab';
import TrailerTab from './TrailerTab';
import CastTab from './CastTab';
import RecommendTab from './RecommendTab';

const NavButtons = ({ movieData, credits, videos, images, recommendations, seasons, isMovie, movieId }) => {
  const [activeTab, setActiveTab] = useState('episodes');

  const tabs = [
    { id: 'episodes', label: 'Tập phim', icon: '🎬' },
    { id: 'gallery', label: 'Hình ảnh', icon: '🖼️' },
    { id: 'trailers', label: 'Trailer', icon: '▶️' },
    { id: 'cast', label: 'Diễn Viên', icon: '👥' },
    { id: 'recommendations', label: 'Đề Xuất', icon: '⭐' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'episodes':
        return (
          <EpisodeTab 
            movieData={movieData} 
            seasons={seasons} 
            isMovie={isMovie} 
            movieId={movieId}
          />
        );
      case 'gallery':
        return <GalleryTab images={images} />;
      case 'trailers':
        return <TrailerTab videos={videos} />;
      case 'cast':
        return <CastTab credits={credits} />;
      case 'recommendations':
        return <RecommendTab recommendations={recommendations} isMovie={isMovie} />;
      default:
        return (
          <EpisodeTab 
            movieData={movieData} 
            seasons={seasons} 
            isMovie={isMovie} 
            movieId={movieId}
          />
        );
    }
  };

  return (
    <div className="nav-tabs-container mt-8">
      {/* Navigation Buttons */}
      <div className="nav-tabs flex border-b border-gray-700 gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-300 whitespace-nowrap text-sm font-medium ${
              activeTab === tab.id
                ? 'border-yellow-400 text-yellow-400'
                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default NavButtons;
