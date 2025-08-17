// SliderMovie.jsx
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ItemCard from "./ItemCard";
import { MovieCardSkeleton } from "./Skeleton";
import useSlider from "../hooks/useSlider";

const VISIBLE_COUNT = 7;

const SliderMovie = ({
  title,
  endpoint,
  mediaType,
  showViewMore = true,
  limit = 15,
}) => {
  const {
    data,
    loading,
    error,
    retry,
    getCachedPreviewData,
    cachePreviewData,
  } = useSlider(endpoint, mediaType, limit);

  const [swiperInstance, setSwiperInstance] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 10 },
    640: { slidesPerView: 2, spaceBetween: 15 },
    768: { slidesPerView: 4, spaceBetween: 20 },
    1024: { slidesPerView: 5, spaceBetween: 20 },
    1280: { slidesPerView: 6, spaceBetween: 25 },
    1536: { slidesPerView: 7, spaceBetween: 25 },
  };

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  if (error) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400 mb-2">Không thể tải dữ liệu</p>
          <button
            onClick={retry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const handleViewMore = () => console.log(`View more for: ${title}`);

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {showViewMore && (
          <button
            onClick={handleViewMore}
            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors flex items-center space-x-1"
          >
            <span>Xem thêm</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Slider Container */}
      <div className="relative group overflow-hidden">
        {loading ? (
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(VISIBLE_COUNT)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <MovieCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Navigation Buttons */}
            <button
              ref={prevRef}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-30"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              ref={nextRef}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-30"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Swiper */}
            <Swiper
              modules={[Navigation, Virtual]}
              breakpoints={breakpoints}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              virtual
              slidesPerView={VISIBLE_COUNT}
              spaceBetween={25}
              onSwiper={setSwiperInstance}
              watchSlidesProgress
              slideVisibleClass="slide-visible"
              className="movie-slider"
            >
              {data.map((item, index) => (
                <SwiperSlide key={`${item.id}-${index}`} virtualIndex={index}>
                  <ItemCard
                    item={item}
                    mediaType={mediaType}
                    getCachedPreviewData={getCachedPreviewData}
                    cachePreviewData={cachePreviewData}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default SliderMovie;
