import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Thêm import Link
import usePreviewCard from "../hooks/usePreviewCard";
import PreviewRender from "./PreviewCard/PreviewRender";
import Image404 from "./404Image";
import { API_CONFIG } from "../utils/constants";

const ItemCard = ({
  item,
  mediaType,
  getCachedPreviewData,
  cachePreviewData,
  enablePreview = true, // nhận prop mới
}) => {
  const [itemDetails, setItemDetails] = useState({ vi: null, en: null });
  const [loading, setLoading] = useState(true);

  const { previewData, showPreview, handleMouseEnter, handleMouseLeave } =
    usePreviewCard(item, mediaType, getCachedPreviewData, cachePreviewData);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = API_CONFIG.BASE_URL;
  const IMAGE_BASE_URL = API_CONFIG.IMAGE_BASE_URL;

  // Fetch basic item details for card display
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!API_KEY || !item?.id) return;

      try {
        const endpoint = mediaType === "movie" ? "movie" : "tv";

        // Fetch Vietnamese data
        const viResponse = await fetch(
          `${BASE_URL}/${endpoint}/${item.id}?language=vi-VN&api_key=${API_KEY}`
        );
        const viData = await viResponse.json();

        // Fetch English data
        const enResponse = await fetch(
          `${BASE_URL}/${endpoint}/${item.id}?language=en-US&api_key=${API_KEY}`
        );
        const enData = await enResponse.json();

        setItemDetails({ vi: viData, en: enData });
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [item?.id, mediaType, API_KEY, BASE_URL]);

  const handleMouseEnter = (e) => {
    if (!enablePreview) return; // không bật preview nếu nhỏ hơn LG
    // ...existing code...
  };

  if (loading) {
    return (
      <div
        className={
          layout === "horizontal"
            ? "flex space-x-3 bg-gray-800 rounded-lg p-3 animate-pulse"
            : "w-full max-w-[180px] h-72 bg-gray-800 rounded-lg animate-pulse"
        }
      >
        <div
          className={
            layout === "horizontal"
              ? "w-16 h-24 bg-gray-700 rounded flex-shrink-0"
              : "w-full h-full bg-gray-700 rounded-lg"
          }
        ></div>
        {layout === "horizontal" && (
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        )}
      </div>
    );
  }

  const posterUrl = item?.poster_path
    ? `${IMAGE_BASE_URL}/w500${item.poster_path}`
    : null;

  const titleVi =
    itemDetails.vi?.[mediaType === "movie" ? "title" : "name"] ||
    item?.[mediaType === "movie" ? "title" : "name"] ||
    "";

  const titleEn =
    itemDetails.en?.[mediaType === "movie" ? "title" : "name"] ||
    item?.[mediaType === "movie" ? "original_title" : "original_name"] ||
    "";

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {layout === "horizontal" ? (
        // Horizontal Layout for Sidebar
        <Link to={`/${mediaType}/${item.id}`}>
          <div className="flex space-x-3 bg-gray-800/50 rounded-lg p-3 cursor-pointer transform transition-all duration-200 hover:bg-gray-700/50 hover:scale-105">
            {/* Small Poster */}
            <div className="relative w-16 h-24 bg-gray-900 rounded overflow-hidden flex-shrink-0">
              <Image404
                src={posterUrl}
                alt={titleVi || titleEn}
                className="w-full h-full object-cover"
                type="poster"
                loading="lazy"
              />
            </div>

            {/* Title and Info */}
            <div className="flex-1 min-w-0">
              {/* Vietnamese Title */}
              {titleVi && (
                <h4 className="text-white font-medium text-xs xsm:text-sm mb-1 line-clamp-2 leading-tight hover:text-yellow-400 transition-colors">
                  {titleVi}
                </h4>
              )}

              {/* English Title */}
              {titleEn && titleVi !== titleEn && (
                <p className="text-gray-400 text-xs line-clamp-1 leading-tight hover:text-gray-300 transition-colors">
                  {titleEn}
                </p>
              )}
            </div>
          </div>
        </Link>
      ) : (
        // Vertical Layout (Original)
        <div className="w-full max-w-[200px] cursor-pointer transition-transform duration-200 hover:scale-105 group flex flex-col">
          <Link to={`/${mediaType}/${item.id}`}>
            <div className="relative w-full aspect-[2/3] bg-gray-900 rounded-lg overflow-hidden">
              <Image404
                src={posterUrl}
                alt={titleVi || titleEn}
                className="w-full h-full object-cover"
                type="poster"
                loading="lazy"
              />
            </div>
          </Link>
          <Link to={`/${mediaType}/${item.id}`} className="block px-1 mt-2">
            {/* Vietnamese Title */}
            {titleVi && (
              <h3 className="text-white font-normal text-sm mb-1 line-clamp-2 leading-tight hover:text-yellow-400 transition-colors">
                {titleVi}
              </h3>
            )}

            {/* English Title */}
            {titleEn && (
              <p className="text-gray-400 text-xs line-clamp-1 leading-tight hover:text-gray-300 transition-colors">
                {titleEn}
              </p>
            )}
          </Link>
        </div>
      )}

      {/* Preview Render - Only show for vertical layout */}
      {layout === "vertical" && showPreview && previewData && (
        <PreviewRender data={previewData} mediaType={mediaType} />
      )}
    </div>
  );
};

export default ItemCard;
