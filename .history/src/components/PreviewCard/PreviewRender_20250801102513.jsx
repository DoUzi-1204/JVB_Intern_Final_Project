import React from "react";
import MoviePreview from "./MoviePreview";
import TvPreview from "./TvPreview";

const PreviewRender = ({ data, mediaType }) => {
  if (!data) return null;

  // Helper functions
  const getCertification = (itemData, type) => {
    if (!itemData) return "NR";

    if (type === "movie") {
      const usRelease = itemData.release_dates?.results?.find(
        (release) => release.iso_3166_1 === "US"
      );
      return usRelease?.release_dates?.[0]?.certification || "NR";
    } else {
      const usRating = itemData.content_ratings?.results?.find(
        (rating) => rating.iso_3166_1 === "US"
      );
      return usRating?.rating || "NR";
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  };

  const formatReleaseYear = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : "";
  };

  // Render appropriate preview based on media type
  if (mediaType === "movie") {
    return (
      <MoviePreview
        data={data}
        getCertification={getCertification}
        formatRuntime={formatRuntime}
        formatReleaseYear={formatReleaseYear}
      />
    );
  } else if (mediaType === "tv") {
    return (
      <TvPreview
        data={data}
        getCertification={getCertification}
        formatReleaseYear={formatReleaseYear}
      />
    );
  }

  return null;
};

export default PreviewRender;
