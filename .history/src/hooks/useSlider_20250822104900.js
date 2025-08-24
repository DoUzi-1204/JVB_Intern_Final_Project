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

      // Tách type và category từ endpoint
      // endpoint ví dụ: "/movie/popular"
      const [ , type, category ] = endpoint.split('/'); // ['', 'movie', 'popular']

      const response = await fetch(`/api/slider?type=${type}&category=${category}&limit=${limit}`);
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

  const getCachedPreviewData = useCallback(
    (itemId) => {
      return previewCache.get(itemId);
    },
    [previewCache]
  );

  // Prefetch preview data for visible items
  const prefetchPreviewData = useCallback(
    async (items) => {
      if (!items.length) return;

      const prefetchPromises = items.slice(0, 10).map(async (item) => {
        if (previewCache.has(item.id)) return;
        try {
          // Gọi backend proxy cho preview
          const res = await fetch(`/api/preview/${mediaType}/${item.id}`);
          const previewData = await res.json();
          cachePreviewData(item.id, previewData);
        } catch (error) {
          console.error(`Error prefetching data for item ${item.id}:`, error);
        }
      });
      await Promise.allSettled(prefetchPromises);
    },
    [mediaType, previewCache, cachePreviewData]
  );

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
