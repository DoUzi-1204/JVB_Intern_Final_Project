import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { TbListSearch } from "react-icons/tb";
import useSearchPage from "../hooks/useSearchPage";
import ItemCard from "../components/ItemCard";
import { API_CONFIG } from "../utils/constants";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("movies");
  const [actorPage, setActorPage] = useState(1);

  const query = searchParams.get("q") || "";

  const {
    searchResults,
    currentPage,
    loading,
    mediaItems,
    peopleItems,
    getCachedPreviewData,
    cachePreviewData,
    handlePageChange,
  } = useSearchPage(query);

  // Filter only actors from people items
  const actorsOnly = peopleItems.filter(
    (person) => person.known_for_department === "Acting"
  );

  // Pagination for actors (24 actors per page = 4 rows x 6 actors)
  const actorsPerPage = 24;
  const totalActorPages = Math.ceil(actorsOnly.length / actorsPerPage);
  
  const startIndex = (actorPage - 1) * actorsPerPage;
  const endIndex = startIndex + actorsPerPage;
  const currentActors = actorsOnly.slice(startIndex, endIndex);

  const handleActorPageChange = (page) => {
    setActorPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderActorPagination = () => {
    if (totalActorPages <= 1) return null;

    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, actorPage - halfVisible);
    let endPage = Math.min(totalActorPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => handleActorPageChange(actorPage - 1)}
          disabled={actorPage === 1}
          className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
        >
          Trước
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handleActorPageChange(page)}
            className={`px-3 py-2 rounded border transition-colors duration-200 ${
              page === actorPage
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handleActorPageChange(actorPage + 1)}
          disabled={actorPage === totalActorPages}
          className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
        >
          Sau
        </button>
      </div>
    );
  };

  const renderPagination = () => {
    if (searchResults.totalPages <= 1) return null;

    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(
      searchResults.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
        >
          Trước
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded border transition-colors duration-200 ${
              page === currentPage
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === searchResults.totalPages}
          className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
        >
          Sau
        </button>
      </div>
    );
  };

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <FiSearch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Tìm kiếm phim
            </h1>
            <p className="text-gray-400">
              Nhập từ khóa để tìm kiếm phim, phim bộ và diễn viên
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6 text-left">
          <h1 className="text-2xl font-medium text-white mb-2 text-left flex items-center gap-2">
            <TbListSearch className="w-7 h-7 text-white" />
            Kết quả tìm kiếm <span className="text-white">"{query}"</span>
          </h1>
          {/* <p className="text-gray-400 text-left">
            Tìm thấy {searchResults.total} kết quả
          </p> */}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("movies")}
            className={`px-6 py-2 rounded-3xl font-medium transition-all duration-200 ${
              activeTab === "movies"
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Phim/Phim bộ ({mediaItems.length})
          </button>
          <button
            onClick={() => setActiveTab("people")}
            className={`px-6 py-2 rounded-3xl font-medium transition-all duration-200 ${
              activeTab === "people"
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Diễn viên ({actorsOnly.length})
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Movies/TV Tab */}
        {activeTab === "movies" && !loading && (
          <div>
            {mediaItems.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                  {mediaItems.map((item) => (
                    <ItemCard
                      key={`${item.media_type}-${item.id}`}
                      item={{
                        ...item,
                        media_type:
                          item.media_type || (item.title ? "movie" : "tv"),
                      }}
                      mediaType={
                        item.media_type || (item.title ? "movie" : "tv")
                      }
                      getCachedPreviewData={getCachedPreviewData}
                      cachePreviewData={cachePreviewData}
                    />
                  ))}
                </div>
                {renderPagination()}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl text-gray-600 mb-4">🎬</div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Không tìm thấy phim nào
                </h3>
                <p className="text-gray-400">Thử tìm kiếm với từ khóa khác</p>
              </div>
            )}
          </div>
        )}

        {/* People Tab */}
        {activeTab === "people" && !loading && (
          <div>
            {currentActors.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-6">
                  {currentActors.map((person) => (
                    <div
                      key={`person-${person.id}`}
                      className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://www.themoviedb.org/person/${person.id}`,
                          "_blank"
                        )
                      }
                    >
                      {/* Profile Image */}
                      <div className="aspect-[3/4] bg-gray-700">
                        {person.profile_path ? (
                          <img
                            src={`${API_CONFIG.IMAGE_BASE_URL}/w300${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">
                            👤
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="text-white font-medium text-sm truncate mb-1">
                          {person.name}
                        </h3>
                        {person.known_for_department && (
                          <p className="text-gray-400 text-xs truncate mb-2">
                            {person.known_for_department}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {renderActorPagination()}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl text-gray-600 mb-4">👤</div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Không tìm thấy diễn viên nào
                </h3>
                <p className="text-gray-400">Thử tìm kiếm với từ khóa khác</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
