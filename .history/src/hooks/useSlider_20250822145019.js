import { useState, useEffect, useCallback } from "react";

const useSlider = (endpoint, mediaType, limit = 15) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  // Cache for preview data to avoid duplicate API calls
  const [previewCache, setPreviewCache] = useState(new Map());

  const fetchData = useCallback(async () => {
    if (!API_KEY) {
      setError("API key not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Calculate how many pages we need to get the required number of items
      const itemsPerPage = 20;
      const pagesNeeded = Math.ceil(limit / itemsPerPage);

      let allResults = [];

      for (let page = 1; page <= pagesNeeded; page++) {
        const response = await fetch(
          `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=vi-VN&page=${page}`
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
      setData(limitedResults);
    } catch (err) {
      console.error("Error fetching slider data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, API_KEY, limit]);

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

  // ...existing code...

  useEffect(() => {
    fetchData();
  }, [fetchData]);
