import { Link } from "react-router-dom";
import usePreviewCard from "../hooks/usePreviewCard";
import PreviewRender from "./PreviewCard/PreviewRender";
import Image404 from "./404Image";
import { API_CONFIG } from "../utils/constants";

const ItemCard = ({
  item,
  mediaType,
  getCachedPreviewData,
  cachePreviewData,
  layout = "vertical",
}) => {
  const { previewData, showPreview, handleMouseEnter, handleMouseLeave } =
    usePreviewCard(item, mediaType, getCachedPreviewData, cachePreviewData);

  const IMAGE_BASE_URL = API_CONFIG.IMAGE_BASE_URL;

  const posterUrl = item?.poster_path
    ? `${IMAGE_BASE_URL}/w500${item.poster_path}`
    : null;

  const titleVi = item?.[mediaType === "movie" ? "title" : "name"] || "";

  const titleEn = item?.[mediaType === "movie" ? "title" : "name"] || "";

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {layout === "horizontal" ? (
        <Link to={`/${mediaType}/${item.id}`}>
          <div className="flex space-x-3 bg-gray-800/50 rounded-lg p-3 cursor-pointer transform transition-all duration-200 hover:bg-gray-700/50 hover:scale-105">
            <div className="relative w-16 h-24 bg-gray-900 rounded overflow-hidden flex-shrink-0">
              <Image404
                src={posterUrl}
                alt={titleVi || titleEn}
                className="w-full h-full object-cover"
                type="poster"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              {titleVi && (
                <h4 className="text-white font-medium text-xs xsm:text-sm mb-1 line-clamp-2 leading-tight hover:text-yellow-400 transition-colors">
                  {titleVi}
                </h4>
              )}
              {titleEn && titleVi !== titleEn && (
                <p className="text-gray-400 text-xs line-clamp-1 leading-tight hover:text-gray-300 transition-colors">
                  {titleEn}
                </p>
              )}
            </div>
          </div>
        </Link>
      ) : (
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
            {titleVi && (
              <h3 className="text-white font-normal text-sm mb-1 line-clamp-2 leading-tight hover:text-yellow-400 transition-colors">
                {titleVi}
              </h3>
            )}
            {titleEn && (
              <p className="text-gray-400 text-xs line-clamp-1 leading-tight hover:text-gray-300 transition-colors">
                {titleEn}
              </p>
            )}
          </Link>
        </div>
      )}
      {layout === "vertical" && showPreview && previewData && (
        <PreviewRender data={previewData} mediaType={mediaType} />
      )}
    </div>
  );
};

export default ItemCard;
