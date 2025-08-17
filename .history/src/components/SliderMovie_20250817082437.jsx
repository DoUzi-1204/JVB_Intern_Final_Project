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

      {/* Slider Container với Frame Clipping */}
      <div className="relative group px-2" style={{overflowX: 'hidden', overflowY: 'visible', borderLeft: '4px solid #181c2b', borderRight: '4px solid #181c2b', height: 'auto'}}>
        {/* Frame trái */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "4px",
            height: "100%",
            zIndex: 20,
            background: "#181c2b"
          }}
        ></div>
        {/* Frame phải */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "4px",
            height: "100%",
            zIndex: 20,
            background: "#181c2b"
          }}
        ></div>
        {loading ? (
          <div className="flex space-x-4">
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
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-30"
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
              <>
                {data.map((item, index) => (
                  <SwiperSlide
                    key={`${item.id}-${index}`}
                    virtualIndex={index}
                    className="h-auto flex justify-center items-start"
                  >
                    <ItemCard
                      item={item}
                      mediaType={mediaType}
                      getCachedPreviewData={getCachedPreviewData}
                      cachePreviewData={cachePreviewData}
                    />
                  </SwiperSlide>
                ))}
              </>
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
                  className="h-auto flex justify-center items-start"
                >
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
