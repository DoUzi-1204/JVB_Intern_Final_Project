import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image404 from "../404Image";
import { API_CONFIG } from "../../utils/constants";
import usePreviewCard from "../../hooks/usePreviewCard";
import PreviewRender from "../PreviewCard/PreviewRender";

const TopDayCard = ({
  item,
  index = 0,
  mediaType = "movie",
  getCachedPreviewData,
  cachePreviewData,
}) => {
  const IMAGE_BASE = API_CONFIG.IMAGE_BASE_URL;

  const { previewData, showPreview, handleMouseEnter, handleMouseLeave } =
    usePreviewCard(item, mediaType, getCachedPreviewData, cachePreviewData);

  const cardRef = useRef(null);
  const [anchorRect, setAnchorRect] = useState(null);

  // hover timer to avoid firing preview on quick drags
  const hoverTimerRef = useRef(null);

  const onMouseEnterDelayed = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      handleMouseEnter();
      hoverTimerRef.current = null;
    }, 500);
  };

  const onMouseEnterWithRect = () => {
    if (cardRef.current) setAnchorRect(cardRef.current.getBoundingClientRect());
    onMouseEnterDelayed();
  };

  const onMouseLeaveImmediate = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    handleMouseLeave();
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };
  }, []);

  const posterUrl = item?.poster_path
    ? `${IMAGE_BASE}/w342${item.poster_path}`
    : null;

  const titleVi = item?.vi_title || item?.title || item?.name || "";
  const titleEn = item?.en_title || item?.original_title || item?.title || "";

  const vote = item?.vote_average ? item.vote_average.toFixed(1) : "-";
  const year = item?.release_date
    ? new Date(item.release_date).getFullYear()
    : item?.first_air_date
    ? new Date(item.first_air_date).getFullYear()
    : "-";

  const isOdd = (index + 1) % 2 === 1;

  return (
    <div ref={cardRef} className="w-full max-w-[260px]" onMouseEnter={onMouseEnterWithRect} onMouseLeave={onMouseLeaveImmediate}>
      <Link to={`/${mediaType}/${item.id}`} className="block">
        <div className="relative rounded-md overflow-hidden transition-transform duration-200 hover:scale-105">
          {/* Poster area */}
          <div
            className={`w-full aspect-[2/3] flex items-center justify-center
              ${
                isOdd
                  ? "[clip-path:polygon(0_30px,100%_0,100%_100%,0_100%)]" // cạnh trái cao hơn phải
                  : "[clip-path:polygon(0_0,100%_30px,100%_100%,0_100%)]" // cạnh phải cao hơn trái
              }`}
          >
            <Image404
              src={posterUrl}
              alt={titleVi || titleEn}
              className="w-full h-full object-cover"
              type="poster"
              loading="lazy"
            />
          </div>

          {/* Bottom info */}
          <div className="flex items-center justify-between px-1 py-3 bg-gray-900">
            {/* Left: rank */}
            <div className="flex-shrink-0 w-14 flex items-center justify-center">
              <span className="text-6xl italic font-extrabold select-none bg-gradient-to-tr from-yellow-100 to-yellow-600 text-transparent bg-clip-text">
                {index + 1}
              </span>
            </div>

            {/* Right: stacked info */}
            <div className="ml-2 flex-1 min-w-0 text-left">
              <div className="text-white font-semibold text-sm line-clamp-1">
                {titleVi}
              </div>
              <div className="text-gray-400 text-xs mt-1 line-clamp-1">
                {titleEn}
              </div>
              <div className="flex gap-2 items-center mt-2">
                {vote !== "-" && (
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    TMDB {vote}
                  </span>
                )}
                {year !== "-" && (
                  <span className="bg-white/10 border border-white/50 text-white text-xs px-2 py-1 rounded">
                    {year}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {showPreview && previewData && (
        <PreviewRender data={previewData} mediaType={mediaType} anchorRect={anchorRect} />
      )}
    </div>
  );
};

export default TopDayCard;
