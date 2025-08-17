import React from "react";
import ItemCard from "../../ItemCard";

const RecommendTab = ({ recommendations, isMovie }) => {
  const mediaType = isMovie ? "movie" : "tv";
  const hasRecommendations = recommendations?.results?.length > 0;

  return (
    <div className="recommend-tab-container">
      <h3 className="text-lg font-bold text-white mb-6 text-left">Đề Xuất</h3>

      {!hasRecommendations ? (
        <p className="text-gray-400">Chưa có phim đề xuất nào.</p>
      ) : (
        <>
          <div className="recommendations-grid grid grid-cols-5 gap-7">
            {recommendations.results.map((item, index) => (
              <div key={`${item.id}-${index}`} className="recommendation-item">
                <ItemCard
                  item={item}
                  mediaType={mediaType}
                  getCachedPreviewData={() => null}
                  cachePreviewData={() => {}}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendTab;
