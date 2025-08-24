import { useState, useEffect, useCallback } from "react";
import { fetchSlider } from "../utils/api";

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
      // endpoint: category, mediaType: type
      const dataRes = await fetchSlider(mediaType, endpoint, limit);
      setData(dataRes.results || []);
      setHasMore(dataRes.hasMore ?? true);
    } catch (err) {
      console.error("Error fetching slider data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [mediaType, endpoint, limit]);

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
      if (!API_KEY || !items.length) return;

      const prefetchPromises = items.slice(0, 10).map(async (item) => {
        if (previewCache.has(item.id)) return;

        try {
          const isMovie = mediaType === "movie";
          const endpoint = isMovie ? "movie" : "tv";
          const appendResponse = isMovie ? "release_dates" : "content_ratings";

          // Fetch Vietnamese data
          const viResponse = await fetch(
            `${BASE_URL}/${endpoint}/${item.id}?language=vi-VN&api_key=${API_KEY}&append_to_response=${appendResponse}`
          );
          const viData = await viResponse.json();

          // Fetch English data
          const enResponse = await fetch(
            `${BASE_URL}/${endpoint}/${item.id}?language=en-US&api_key=${API_KEY}&append_to_response=${appendResponse}`
          );
          const enData = await enResponse.json();

          const previewData = {
            vi: viData,
            en: enData,
            mediaType,
          };

          cachePreviewData(item.id, previewData);
        } catch (error) {
          console.error(`Error prefetching data for item ${item.id}:`, error);
        }
      });

      await Promise.allSettled(prefetchPromises);
    },
    [API_KEY, mediaType, previewCache, cachePreviewData]
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
