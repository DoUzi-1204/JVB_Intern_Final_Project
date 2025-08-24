import { useState, useCallback } from "react";

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
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const BASE_URL = ""; // proxied through server /api

  // Fetch detailed data for preview
  const fetchPreviewData = useCallback(
    async (id, type) => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const isMovie = type === "movie";
        const endpoint = isMovie ? "movie" : "tv";
        const appendResponse = isMovie ? "release_dates" : "content_ratings";

        // Fetch Vietnamese data
        const viResponse = await fetch(
          `/api/${endpoint}/${id}?language=vi-VN&append_to_response=${appendResponse}`
        );
        const viData = await viResponse.json();

        // Fetch English data
        const enResponse = await fetch(
          `/api/${endpoint}/${id}?language=en-US&append_to_response=${appendResponse}`
        );
        const enData = await enResponse.json();

        const newPreviewData = {
          vi: viData,
          en: enData,
          mediaType: type,
        };

        setPreviewData(newPreviewData);

        // Cache the data if caching function is provided
        if (cachePreviewData) {
          cachePreviewData(id, newPreviewData);
        }
      } catch (err) {
        console.error("Error fetching preview data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [cachePreviewData]
  );

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Set timeout for 0.5 second delay
    const timeout = setTimeout(() => {
      setShowPreview(true);
      if (item?.id && mediaType) {
        // Check cache first
        if (getCachedPreviewData && getCachedPreviewData(item.id)) {
          setPreviewData(getCachedPreviewData(item.id));
        } else {
          fetchPreviewData(item.id, mediaType);
        }
      }
    }, 500);

    setHoverTimeout(timeout);
  }, [
    item?.id,
    mediaType,
    fetchPreviewData,
    getCachedPreviewData,
    hoverTimeout,
  ]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setShowPreview(false);
    setPreviewData(null);

    // Clear timeout if user leaves before delay
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  }, [hoverTimeout]);

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
