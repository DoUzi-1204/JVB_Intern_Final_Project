import { useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
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
      <div className="flex items-center justify-between -mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {showViewMore && (
          <button
            onClick={handleViewMore}
            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors flex items-center space-x-1"
          >
            <span>Xem thêm</span>
            <FaAngleRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Slider Container */}
      <div className="relative group px-2 py-11 overflow-x-hidden  ">
        {loading ? (
          <div className="flex space-x-4 ">
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
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-30"
              aria-label="Previous"
            >
              <FaAngleLeft className="w-6 h-6" />
            </button>

            <button
              ref={nextRef}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-30"
              aria-label="Next"
            >
              <FaAngleRight className="w-6 h-6" />
            </button>

            {/* Swiper */}
            <Swiper
              modules={[Navigation, Virtual]}
              slidesPerView={VISIBLE_COUNT}
              spaceBetween={20} // khoảng cách cố định
              breakpoints={{
                0: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
                1536: { slidesPerView: 7 },
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              virtual
              onSwiper={setSwiperInstance}
              watchSlidesProgress
              slideVisibleClass="slide-visible"
              className="movie-slider"
            >
              {data.map((item, index) => (
                <SwiperSlide
                  key={`${item.id}-${index}`}
                  virtualIndex={index}
                  className="h-auto flex justify-center items-start"
                >
                  <div className="w-full max-w-[180px]">
                    <ItemCard
                      item={item}
                      mediaType={mediaType}
                      getCachedPreviewData={getCachedPreviewData}
                      cachePreviewData={cachePreviewData}
                    />
                  </div>
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
