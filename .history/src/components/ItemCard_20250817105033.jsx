import { Link } from "react-router-dom";
import Image404 from "./Image404";

const ItemCard = ({ item, mediaType, layout = "vertical" }) => {
  if (!item) return null;

  const titleVi = item?.title || item?.name;
  const titleEn = item?.original_title || item?.original_name;
  const posterUrl = item?.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null;

  return (
    <div
      className={`${
        layout === "horizontal"
          ? "flex items-center space-x-4 cursor-pointer group"
          : "cursor-pointer transform transition-transform duration-200 hover:scale-105 group"
      }`}
    >
      {/* Horizontal layout */}
      {layout === "horizontal" ? (
        <>
          {/* Poster */}
          <Link to={`/${mediaType}/${item.id}`}>
            <div className="relative w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-44 xl:w-32 xl:h-48 bg-gray-900 rounded-lg overflow-hidden">
              <Image404
                src={posterUrl}
                alt={titleVi || titleEn}
                className="w-full h-full object-cover"
                type="poster"
                loading="lazy"
              />
            </div>
          </Link>

          {/* Titles */}
          <div className="flex flex-col">
            <Link
              to={`/${mediaType}/${item.id}`}
              className="text-white font-medium text-sm sm:text-base hover:text-yellow-400 transition-colors line-clamp-1"
            >
              {titleVi}
            </Link>
            {titleEn && (
              <p className="text-gray-400 text-xs sm:text-sm line-clamp-1 hover:text-gray-300 transition-colors">
                {titleEn}
              </p>
            )}
          </div>
        </>
      ) : (
        /* Vertical layout (đã sửa responsive) */
        <div className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64">
          {/* Poster */}
          <Link to={`/${mediaType}/${item.id}`}>
            <div className="relative aspect-[2/3] bg-gray-900 rounded-lg overflow-hidden mb-2">
              <Image404
                src={posterUrl}
                alt={titleVi || titleEn}
                className="w-full h-full object-cover"
                type="poster"
                loading="lazy"
              />
            </div>
          </Link>

          {/* Titles */}
          <Link to={`/${mediaType}/${item.id}`} className="block px-1">
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
    </div>
  );
};

export default ItemCard;
