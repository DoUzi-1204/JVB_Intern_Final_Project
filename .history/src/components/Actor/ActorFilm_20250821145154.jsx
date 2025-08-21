import React from "react";
import ItemCard from "../ItemCard";

export default function ActorFilm({ credits, loading }) {
  if (loading) {
    return (
      <div className="w-3/4 p-6 bg-gray-800 rounded-lg ml-4 animate-pulse">
        <h3 className="text-2xl font-medium text-white mb-4">Phim liên quan</h3>
        <div className="grid grid-cols-5 gap-6">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="h-64 bg-gray-700 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  if (!credits || credits.length === 0)
    return (
      <div className="w-3/4 p-6 bg-gray-800 rounded-lg ml-4">
        Không có phim liên quan.
      </div>
    );

  // Chỉ lấy các phim có poster
  const filtered = credits.filter((item) => item.poster_path);

  return (
    <div className="min-w-3/4 p-0 rounded-lg ml-3">
      <h3 className="text-2xl font-medium text-left text-white mb-4">
        Phim liên quan
      </h3>
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-7 gap-x-3">
        {filtered.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            mediaType={item.media_type}
            layout="vertical"
          />
        ))}
      </div>
    </div>
  );
}
