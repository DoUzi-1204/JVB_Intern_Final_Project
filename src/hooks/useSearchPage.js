import { useState, useEffect, useRef, useCallback } from "react";
import useSearch from "./useSearch";

const useSearchPage = (query) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState({
    movies: [],
    tv: [],
    people: [],
    total: 0,
    totalPages: 0,
  });

  // Cache for preview data to improve performance
  const previewCacheRef = useRef(new Map());

  const { searchMulti, loading } = useSearch();

  // Cache management functions
  const getCachedPreviewData = useCallback((itemId, mediaType) => {
    const key = `${mediaType}-${itemId}`;
    return previewCacheRef.current.get(key);
  }, []);

  const cachePreviewData = useCallback((itemId, mediaType, data) => {
    const key = `${mediaType}-${itemId}`;
    previewCacheRef.current.set(key, data);

    // Limit cache size to prevent memory issues
    if (previewCacheRef.current.size > 100) {
      const firstKey = previewCacheRef.current.keys().next().value;
      previewCacheRef.current.delete(firstKey);
    }
  }, []);

  const clearPreviewCache = useCallback(() => {
    previewCacheRef.current.clear();
  }, []);

  // Fetch search results
  useEffect(() => {
    if (query.trim()) {
      const fetchResults = async () => {
        const results = await searchMulti(query, currentPage);
        setSearchResults(results);
      };
      fetchResults();
    }
  }, [query, currentPage, searchMulti]);

  // Reset page when query changes and clear cache
  useEffect(() => {
    setCurrentPage(1);
    clearPreviewCache();
  }, [query, clearPreviewCache]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Combine movies and TV for display
  const mediaItems = [...searchResults.movies, ...searchResults.tv];
  const peopleItems = searchResults.people;

  return {
    searchResults,
    currentPage,
    loading,
    mediaItems,
    peopleItems,
    getCachedPreviewData,
    cachePreviewData,
    handlePageChange,
  };
};

export default useSearchPage;
