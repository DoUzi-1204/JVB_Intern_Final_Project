import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { TbListSearch } from "react-icons/tb";
import useSearchPage from "../hooks/useSearchPage";
import MovieTab from "../components/Search/MovieTab";
import Pagination from "../components/MovieFilter/Pagination";
import PeopleTab from "../components/Search/PeopleTab";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("movies");

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

  const renderPagination = () => {
    if (searchResults.totalPages <= 1) return null;
    return (
      <Pagination
        totalPages={searchResults.totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
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
      <div className=" px-4 py-6">
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
            Phim/Phim bộ
          </button>
          <button
            onClick={() => setActiveTab("people")}
            className={`px-6 py-2 rounded-3xl font-medium transition-all duration-200 ${
              activeTab === "people"
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Diễn viên
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
          <MovieTab
            mediaItems={mediaItems}
            getCachedPreviewData={getCachedPreviewData}
            cachePreviewData={cachePreviewData}
            renderPagination={renderPagination}
          />
        )}

        {/* People Tab */}
        {activeTab === "people" && !loading && (
          <PeopleTab
            actorsOnly={actorsOnly}
            renderPagination={renderPagination}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
