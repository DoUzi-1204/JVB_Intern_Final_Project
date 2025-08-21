import ItemCard from "../ItemCard";

const MovieTab = ({
  mediaItems,
  getCachedPreviewData,
  cachePreviewData,
  renderPagination,
}) => {
  if (!mediaItems || mediaItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-white mb-2">
          Không tìm thấy phim nào
        </h3>
        <p className="text-gray-400">Thử tìm kiếm với từ khóa khác</p>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {mediaItems.map((item) => (
          <ItemCard
            key={`${item.media_type}-${item.id}`}
            item={{
              ...item,
              media_type: item.media_type || (item.title ? "movie" : "tv"),
            }}
            mediaType={item.media_type || (item.title ? "movie" : "tv")}
            getCachedPreviewData={getCachedPreviewData}
            cachePreviewData={cachePreviewData}
          />
        ))}
      </div>
      {renderPagination()}
    </>
  );
};

export default MovieTab;
