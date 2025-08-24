import { useState, useEffect, useCallback } from "react";
import { API_CONFIG } from "../utils/constants";

const useSlider = (endpoint, mediaType, limit = 15) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Determine base for API requests:
  // - If API_CONFIG.BASE_URL is a proxy (starts with http), we'll use `${BASE_URL}/api`.
  // - Otherwise (local dev) we call relative `/api` which Vite proxies to local Express.
  const PROXY_BASE =
    API_CONFIG.BASE_URL && API_CONFIG.BASE_URL.startsWith("http")
      ? `${API_CONFIG.BASE_URL}/api`
      : "/api";

  // Cache for preview data to avoid duplicate API calls
  const [previewCache, setPreviewCache] = useState(new Map());

  const fetchData = useCallback(async () => {
    // Client no longer needs the API key; requests are proxied through the server (/api)

    try {
      setLoading(true);
      setError(null);

      // Calculate how many pages we need to get the required number of items
      const itemsPerPage = 20;
      const pagesNeeded = Math.ceil(limit / itemsPerPage);

      let allResults = [];

      for (let page = 1; page <= pagesNeeded; page++) {
        const response = await fetch(
          `${PROXY_BASE}${endpoint}?language=vi-VN&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const pageData = await response.json();
        allResults = [...allResults, ...pageData.results];

        // If we have enough items or no more pages, break
        if (allResults.length >= limit || page >= pageData.total_pages) {
          setHasMore(page < pageData.total_pages);
          break;
        }
      }

      // Limit to the exact number requested
      const limitedResults = allResults.slice(0, limit);
      // If this is the now_playing movie endpoint, also fetch english titles and merge
      let mergedResults = limitedResults;
      if (endpoint === "/movie/now_playing") {
        try {
          let enAll = [];
          for (let page = 1; page <= pagesNeeded; page++) {
            const resEn = await fetch(
              `${PROXY_BASE}${endpoint}?language=en-US&page=${page}`
            );
            if (!resEn.ok) continue;
            const pageEn = await resEn.json();
            enAll = [...enAll, ...pageEn.results];
            if (enAll.length >= limit || page >= pageEn.total_pages) break;
          }

          const enLimited = enAll.slice(0, limit);
          const enMap = new Map(enLimited.map((it) => [it.id, it]));

          mergedResults = limitedResults.map((viItem) => {
            const enItem = enMap.get(viItem.id);
            return {
              ...viItem,
              en_title: enItem ? enItem.title : viItem.original_title || "",
            };
          });
        } catch (err) {
          // ignore english merge errors, fall back to vi-only items
          console.error("Error fetching English now_playing titles:", err);
        }
      }
      setData(mergedResults);
    } catch (err) {
      console.error("Error fetching slider data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, limit, PROXY_BASE]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
