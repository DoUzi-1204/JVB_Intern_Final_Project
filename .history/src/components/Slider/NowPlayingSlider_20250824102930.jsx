import { useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ItemCard from "../ItemCard";
import NowPlayingCard from "../CustomCard/NowPlayingCard";
import { MovieCardSkeleton } from "../Skeleton";
import useSlider from "../../hooks/useSlider";

const NowPlayingSlider = ({
  title,
  endpoint = "/movie/now_playing",
  mediaType = "movie",
  showViewMore = false,
  limit = 12,
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

  const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 10 },
    640: { slidesPerView: 2, spaceBetween: 10 },
    1024: { slidesPerView: 3, spaceBetween: 12 },
    1280: { slidesPerView: 4, spaceBetween: 14 },
  };

  return (
    <div className="mb-8 ">
      <div className="flex items-center justify-between mb-6 xs:mb-4">
        <h2 className="text-xl xs:text-2xl font-semibold text-white">
          {title}
        </h2>
        {showViewMore && (
          <button className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors flex items-center space-x-1">
            <span>Xem thêm</span>
          </button>
        )}
      </div>

      <div className="relative group px-2 py-11  ">
        {loading ? (
          <div className="flex space-x-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex-shrink-0">
                <MovieCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <>
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

            <Swiper
              modules={[Navigation, Virtual]}
              slidesPerView={4}
              spaceBetween={14}
              breakpoints={breakpoints}
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
                  <NowPlayingCard
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

export default NowPlayingSlider;
