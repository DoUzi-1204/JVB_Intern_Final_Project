import { useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TopDayCard from "../CustomCard/TopDayCard";
import { MovieCardSkeleton } from "../Skeleton";
import useSlider from "../../hooks/useSlider";

const TopDaySlider = ({ title = "Top 10 phim lẻ hôm nay", limit = 10 }) => {
  // useSlider expects endpoint and mediaType; trending endpoint used here
  const endpoint = "/trending/movie/day"; // matches TMDB path used by useSlider
  const { data, loading, error, retry } = useSlider(endpoint, "movie", limit);

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
    0: { slidesPerView: 1.5, spaceBetween: 10 },
    640: { slidesPerView: 2.5, spaceBetween: 12 },
    1024: { slidesPerView: 3.5, spaceBetween: 14 },
    1280: { slidesPerView: 4.5, spaceBetween: 16 },
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-0">
        <h2 className="text-xl xs:text-2xl font-semibold text-white">{title}</h2>
      </div>

      <div className="relative group px-2 py-5 overflow-x-hidden overflow-y-visible">
        {loading ? (
          <div className="flex space-x-4">
            {[...Array(3)].map((_, idx) => (
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
              className="movie-slider overflow-visible"
            >
              {data.map((item, index) => {
                // Attach language-specific title fields for the card: use existing item fields
                const itemWithTitles = {
                  ...item,
                  vi_title: item.title || item.name || "",
                  en_title: item.original_title || item.title || "",
                };

                return (
                  <SwiperSlide
                    key={`${item.id}-${index}`}
                    virtualIndex={index}
                    className="h-auto flex justify-center items-start overflow-visible"
                  >
                    <TopDayCard item={itemWithTitles} index={index} mediaType="movie" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default TopDaySlider;
