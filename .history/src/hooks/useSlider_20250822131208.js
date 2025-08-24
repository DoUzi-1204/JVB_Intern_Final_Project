import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSliderData } from "../store/sliderSlice";
import { setPreview } from "../store/previewSlice";

const useSlider = (endpoint, mediaType, limit = 15) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Use server proxy at /api to avoid exposing API key in client bundle
  const BASE_URL = "/api";

  const dispatch = useDispatch();
  const cachedSlider = useSelector((state) => state.slider[endpoint]);
  const previewCache = useSelector((state) => state.preview || {});

  const fetchData = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        // if slider data cached in store for this endpoint, reuse it
        if (cachedSlider && Array.isArray(cachedSlider) && cachedSlider.length) {
          setData(cachedSlider.slice(0, limit));
          setHasMore(cachedSlider.length > limit);
          return;
        }

        // Calculate how many pages we need to get the required number of items
        const itemsPerPage = 20;
        const pagesNeeded = Math.ceil(limit / itemsPerPage);

        let allResults = [];

        for (let page = 1; page <= pagesNeeded; page++) {
          const response = await fetch(
            `${BASE_URL}${endpoint}?language=vi-VN&page=${page}`
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
        // store full fetched results into the redux cache for this endpoint
        dispatch(setSliderData({ endpoint, data: allResults }));
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
        if (previewCache[item.id]) return;

        try {
          const isMovie = mediaType === "movie";
          const endpoint = isMovie ? "movie" : "tv";
          const appendResponse = isMovie ? "release_dates" : "content_ratings";

          // Fetch Vietnamese data
          const viResponse = await fetch(
            `${BASE_URL}/${endpoint}/${item.id}?language=vi-VN&append_to_response=${appendResponse}`
          );
          const viData = await viResponse.json();

          // Fetch English data
          const enResponse = await fetch(
            `${BASE_URL}/${endpoint}/${item.id}?language=en-US&append_to_response=${appendResponse}`
          );
          const enData = await enResponse.json();

          const previewData = {
            vi: viData,
            en: enData,
            mediaType,
          };

          // dispatch into redux preview cache for reuse
          dispatch(setPreview({ id: item.id, data: previewData }));
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
