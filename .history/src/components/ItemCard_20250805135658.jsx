import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePreviewCard from "../hooks/usePreviewCard";
import PreviewRender from "./PreviewCard/PreviewRender";

const ItemCard = ({
  item,
  mediaType,
  getCachedPreviewData,
  cachePreviewData,
}) => {
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState({ vi: null, en: null });
  const [loading, setLoading] = useState(true);

  const { previewData, showPreview, handleMouseEnter, handleMouseLeave } =
    usePreviewCard(item, mediaType, getCachedPreviewData, cachePreviewData);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

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
  }, [item?.id, mediaType, API_KEY]);

  if (loading) {
    return (
      <div className="w-48 h-72 bg-gray-800 rounded-lg animate-pulse">
        <div className="w-full h-full bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  const posterUrl = item?.poster_path
    ? `${IMAGE_BASE_URL}/w500${item.poster_path}`
    : "/placeholder-poster.jpg";

  const titleVi =
    itemDetails.vi?.[mediaType === "movie" ? "title" : "name"] ||
    item?.[mediaType === "movie" ? "title" : "name"] ||
    "";

  const titleEn =
    itemDetails.en?.[mediaType === "movie" ? "title" : "name"] ||
    item?.[mediaType === "movie" ? "original_title" : "original_name"] ||
    "";

  const handleCardClick = () => {
    navigate(`/${mediaType}/${item.id}`);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="w-48 cursor-pointer transform transition-transform duration-200 hover:scale-105 group"
        onClick={handleCardClick}
      >
        {/* Poster Image */}
        <div className="relative w-48 h-72 bg-gray-900 rounded-lg overflow-hidden mb-2">
          <img
            src={posterUrl}
            alt={titleVi || titleEn}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Titles Below Poster */}
        <div className="px-1">
          {/* Vietnamese Title */}
          {titleVi && (
            <h3 className="text-white font-bold text-sm mb-1 line-clamp-2 leading-tight">
              {titleVi}
            </h3>
          )}

          {/* English Title */}
          {titleEn && (
            <p className="text-gray-400 text-xs line-clamp-1 leading-tight">
              {titleEn}
            </p>
          )}
        </div>
      </div>

      {/* Preview Render */}
      {showPreview && previewData && (
        <PreviewRender data={previewData} mediaType={mediaType} />
      )}
    </div>
  );
};

export default ItemCard;
