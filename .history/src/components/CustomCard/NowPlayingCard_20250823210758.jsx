import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image404 from "../404Image";
import usePreviewCard from "../../hooks/usePreviewCard";
import PreviewRender from "../PreviewCard/PreviewRender";
import { API_CONFIG } from "../../utils/constants";

const NowPlayingCard = ({
  item,
  getCachedPreviewData,
  cachePreviewData,
  mediaType = "movie",
}) => {
  const IMAGE_BASE = API_CONFIG.IMAGE_BASE_URL;
  // Local cache for english titles to avoid repeated small requests
  // keyed by item id
  if (typeof window !== "undefined" && !window.__titleEnCache) {
    window.__titleEnCache = new Map();
  }
  const titleCache = typeof window !== "undefined" ? window.__titleEnCache : new Map();

  const [titleEn, setTitleEn] = useState(() => {
    return titleCache.get(item?.id) || item?.title || "";
  });

  // Fetch English title (language=en-US) but only the title field — do not cache into preview cache
  useEffect(() => {
    if (!item?.id) return;

    const cached = titleCache.get(item.id);
    if (cached) {
      setTitleEn(cached);
      return;
    }

    const API_KEY = import.meta.env.VITE_API_KEY;
    if (!API_KEY) return;

    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_CONFIG.BASE_URL}/movie/${item.id}?api_key=${API_KEY}&language=en-US`);
        if (!res.ok) return;
        const json = await res.json();
        const en = json.title || item?.title || "";
        if (!mounted) return;
        titleCache.set(item.id, en);
        setTitleEn(en);
      } catch {
        // ignore
      }
    })();

    return () => {
      mounted = false;
    };
  }, [item?.id]);

  const { previewData, showPreview, handleMouseEnter, handleMouseLeave } =
    usePreviewCard(item, mediaType, getCachedPreviewData, cachePreviewData);

  // Local hover timer to avoid firing preview on quick pointer moves (slider drag)
  const hoverTimerRef = useRef(null);

  const onMouseEnterDelayed = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      handleMouseEnter();
      hoverTimerRef.current = null;
    }, 500);
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

  const backdropUrl = item?.backdrop_path
    ? `${IMAGE_BASE}/w780${item.backdrop_path}`
    : null;
  const posterUrl = item?.poster_path
    ? `${IMAGE_BASE}/w342${item.poster_path}`
    : null;

  const titleVi = item?.title || item?.name || "";
  const vote = item?.vote_average ? item.vote_average.toFixed(1) : "-";
  const year = item?.release_date
    ? new Date(item.release_date).getFullYear()
    : item?.first_air_date
    ? new Date(item.first_air_date).getFullYear()
    : "-";

  return (
    <div
      className="block w-[520px] max-w-full"
      onMouseEnter={onMouseEnterDelayed}
      onMouseLeave={onMouseLeaveImmediate}
    >
      <Link to={`/${mediaType}/${item.id}`}>
        <div className="relative rounded-lg overflow-hidden bg-transparent h-[250px] ">
          {/* Backdrop: occupy top 2/3 */}
          <div className="w-full h-[66%] relative bg-gray-800">
            {backdropUrl ? (
              <img
                src={backdropUrl}
                alt={titleVi || titleEn}
                className="w-full h-full object-cover brightness-75"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900" />
            )}
          </div>

          {/* Bottom 1/3 background */}
          <div className="w-full h-[34%] bg-gray-900/90 px-3 py-3 flex items-start">
            <div className="relative flex-shrink-0">
              {/* Poster overlapping: move up to cover part of backdrop */}
              <div className="-mt-12 w-20 h-28 rounded-md border border-gray-500 overflow-hidden bg-gray-700 shadow-md">
                <Image404
                  src={posterUrl}
                  alt={titleVi || titleEn}
                  className="w-full h-full object-cover"
                  type="poster"
                />
              </div>
            </div>

            <div className="ml-3 flex-1 min-w-0 text-left">
              {titleVi ? (
                <>
                  <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2 text-left">
                    {titleVi}
                  </h3>
                  {titleEn && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-1 text-left">
                      {titleEn}
                    </p>
                  )}
                </>
              ) : (
                titleEn && (
                  <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2 text-left">
                    {titleEn}
                  </h3>
                )
              )}

              <div className="flex items-center gap-2 mt-2">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-normal backdrop-blur-sm">
                  TMDB {vote}
                </span>
                {year && (
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
        <PreviewRender data={previewData} mediaType={mediaType} />
      )}
    </div>
  );
};

export default NowPlayingCard;
