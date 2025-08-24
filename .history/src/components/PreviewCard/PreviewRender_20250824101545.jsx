import React from "react";
import { createPortal } from "react-dom";
import MoviePreview from "./MoviePreview";
import TvPreview from "./TvPreview";

const PreviewRender = ({ data, mediaType, anchorRect }) => {
  if (!data || !anchorRect) return null;

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
  // position preview near the anchorRect (to avoid clipping by ancestor overflow)
  const style = {
    position: "absolute",
    top: Math.max(8, anchorRect.top + window.scrollY - 20) + "px",
    left: Math.max(8, anchorRect.left + window.scrollX) + "px",
    zIndex: 9999,
  };

  if (mediaType === "movie") {
    return createPortal(
      <div className="hidden lg:block" style={style}>
        <MoviePreview
          data={data}
          getCertification={getCertification}
          formatRuntime={formatRuntime}
          formatReleaseYear={formatReleaseYear}
        />
      </div>,
      document.body
    );
  } else if (mediaType === "tv") {
    return createPortal(
      <div className="hidden lg:block" style={style}>
        <TvPreview
          data={data}
          getCertification={getCertification}
          formatReleaseYear={formatReleaseYear}
        />
      </div>,
      document.body
    );
  }

  return null;
};

export default PreviewRender;
