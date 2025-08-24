import { useState, useEffect, useCallback } from "react";

const useSlider = (endpoint, mediaType, limit = 15) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // const API_KEY = import.meta.env.VITE_API_KEY;
  // const BASE_URL = "https://api.themoviedb.org/3";

  // Cache for preview data to avoid duplicate API calls
  const [previewCache, setPreviewCache] = useState(new Map());

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Gọi backend proxy cho slider
      const response = await fetch(`/api/slider?endpoint=${endpoint}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dataRes = await response.json();
      setData(dataRes.results || []);
      setHasMore(dataRes.hasMore ?? true);
    } catch (err) {
      console.error("Error fetching slider data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, limit]);

  // Cache preview data to avoid duplicate API calls
  const cachePreviewData = useCallback((itemId, previewData) => {
    setPreviewCache((prev) => new Map(prev.set(itemId, previewData)));
  }, []);

  // getCachedPreviewData và prefetchPreviewData cần được cập nhật lại để sử dụng backend proxy nếu cần
  // ...existing code...

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Prefetch preview data when main data is loaded
  useEffect(() => {
    if (data.length > 0) {
      prefetchPreviewData(data);
    }
  }, [data, prefetchPreviewData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    hasMore,
    retry,
    getCachedPreviewData,
    cachePreviewData,
  };
};

export default useSlider;
