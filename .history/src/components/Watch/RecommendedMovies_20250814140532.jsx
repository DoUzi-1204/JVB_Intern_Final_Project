import React from 'react';
import ItemCard from '../ItemCard';

const RecommendedMovies = ({ recommendations, isMovie }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Không có phim đề xuất</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Phim đề xuất</h3>
      <div className="space-y-4">
        {recommendations.slice(0, 10).map((item) => (
          <div key={item.id} className="hover:scale-105 transition-transform">
            <ItemCard 
              item={item} 
              mediaType={item.media_type || (isMovie ? 'movie' : 'tv')}
              layout="horizontal"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMovies;
