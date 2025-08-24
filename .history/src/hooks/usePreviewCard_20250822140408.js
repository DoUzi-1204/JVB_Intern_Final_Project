import { useState, useCallback, useRef, useEffect } from "react";

const usePreviewCard = (
  item,
  mediaType,
  getCachedPreviewData,
  cachePreviewData
) => {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  // refs to avoid re-renders and manage cancellation
  const hoverTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  // Fetch detailed data for preview
  const fetchPreviewData = useCallback(
    async (id, type) => {
      if (!API_KEY || !id) return;

      // If cached, use cache and avoid network call
      const cached = getCachedPreviewData && getCachedPreviewData(id);
      if (cached) {
        setPreviewData(cached);
        return;
      }

      setLoading(true);
      setError(null);

      // cancel any previous in-flight request
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (e) {}
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const isMovie = type === "movie";
        const endpoint = isMovie ? "movie" : "tv";
        const appendResponse = isMovie ? "release_dates" : "content_ratings";

        // Fetch Vietnamese data
        const viResponse = await fetch(
          `${BASE_URL}/${endpoint}/${id}?language=vi-VN&api_key=${API_KEY}&append_to_response=${appendResponse}`,
          { signal: controller.signal }
        );
        const viData = await viResponse.json();

        // Fetch English data
        const enResponse = await fetch(
          `${BASE_URL}/${endpoint}/${id}?language=en-US&api_key=${API_KEY}&append_to_response=${appendResponse}`,
          { signal: controller.signal }
        );
        const enData = await enResponse.json();

        const newPreviewData = { vi: viData, en: enData, mediaType: type };
        setPreviewData(newPreviewData);

        // Cache the data if caching function is provided
        if (cachePreviewData) {
          cachePreviewData(id, newPreviewData);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          // request was cancelled, no-op
          return;
        }
        console.error("Error fetching preview data:", err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    [API_KEY, cachePreviewData, getCachedPreviewData]
  );

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // If cached, show immediately and avoid network fetch
    const cached = getCachedPreviewData && getCachedPreviewData(item?.id);
    if (cached) {
      setPreviewData(cached);
      setShowPreview(true);
      return;
    }

    // Set timeout for 0.5 second delay before fetching
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPreview(true);
      if (item?.id && mediaType) {
        fetchPreviewData(item.id, mediaType);
      }
      hoverTimeoutRef.current = null;
    }, 500);
  }, [item?.id, mediaType, fetchPreviewData, getCachedPreviewData]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setShowPreview(false);

    // Clear timeout if user leaves before delay
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (e) {}
      abortControllerRef.current = null;
    }

    // Keep cached data if present; otherwise clear
    const cached = getCachedPreviewData && getCachedPreviewData(item?.id);
    if (!cached) setPreviewData(null);
  }, [getCachedPreviewData, item?.id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (e) {}
        abortControllerRef.current = null;
      }
    };
  }, []);

  // Get certification
  const getCertification = useCallback((data, type) => {
    if (!data) return "NR";

    if (type === "movie") {
      const usRelease = data.release_dates?.results?.find(
        (release) => release.iso_3166_1 === "US"
      );
      return usRelease?.release_dates?.[0]?.certification || "NR";
    } else {
      const usRating = data.content_ratings?.results?.find(
        (rating) => rating.iso_3166_1 === "US"
      );
      return usRating?.rating || "NR";
    }
  }, []);

  // Format runtime
  const formatRuntime = useCallback((minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  }, []);

  // Format release year
  const formatReleaseYear = useCallback((dateString) => {
    return dateString ? new Date(dateString).getFullYear() : "";
  }, []);

  return {
    previewData,
    loading,
    error,
    isHovered,
    showPreview,
    handleMouseEnter,
    handleMouseLeave,
    getCertification,
    formatRuntime,
    formatReleaseYear,
  };
};

export default usePreviewCard;
