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

  // position the preview near the anchor rect. We'll offset slightly above the card by default
  const PREVIEW_WIDTH = 384; // w-96
  const PREVIEW_HEIGHT = 416; // approx h-[26rem]

  // calculate left/top clamped to viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = anchorRect.left + window.scrollX;
  // prefer aligning left with card, but if near right edge, shift left so preview fits
  if (left + PREVIEW_WIDTH > viewportWidth - 16) {
    left = Math.max(8, viewportWidth - PREVIEW_WIDTH - 16) + window.scrollX;
  }

  // position preview vertically centered on the card
  const cardCenterY = anchorRect.top + anchorRect.height / 2;
  let top = cardCenterY + window.scrollY - PREVIEW_HEIGHT / 2;
  // clamp to viewport
  top = Math.max(8 + window.scrollY, Math.min(top, viewportHeight - PREVIEW_HEIGHT - 8 + window.scrollY));

  const style = {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
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
