import React from "react";
import ItemCard from "../../ItemCard";

const RecommendTab = ({ recommendations, isMovie }) => {
  if (
    !recommendations ||
    !recommendations.results ||
    recommendations.results.length === 0
  ) {
    return (
      <div className="recommend-tab-container">
        <h3 className="text-l font-medium text-white mb-6 text-left">
          Đề Xuất
        </h3>
        <p className="text-gray-400">Chưa có phim đề xuất nào.</p>
      </div>
    );
  }

  const mediaType = isMovie ? "movie" : "tv";

  return (
    <div className="recommend-tab-container">
      <h3 className="text-xl font-bold text-yellow-400 mb-6 text-left">
        Đề Xuất
      </h3>

      <div className="recommendations-grid grid grid-cols-5 gap-6">
        {recommendations.results.map((item, index) => (
          <div key={`${item.id}-${index}`} className="recommendation-item">
            <ItemCard
              item={item}
              mediaType={mediaType}
              getCachedPreviewData={() => null} // You might want to implement caching
              cachePreviewData={() => {}} // You might want to implement caching
            />
          </div>
        ))}
      </div>

      {/* Show total count */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        Hiển thị {recommendations.results.length}/12 phim đề xuất
      </div>
    </div>
  );
};

export default RecommendTab;
