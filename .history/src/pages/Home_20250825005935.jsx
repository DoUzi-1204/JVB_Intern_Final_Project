import Banner from "../components/Banner/Banner";
import SliderMovie from "../components/SliderMovie";
import NowPlayingSlider from "../components/Slider/NowPlayingSlider";
import TopDaySlider from "../components/Slider/TopDaySlider";
import LazySection from "../components/LazySection";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen overflow-x-hidden">
      <LazySection placeholder={<div className="h-[420px]" />}>
        <Banner />
      </LazySection>

      {/* Movie Sliders Section */}
      <div className="w-full px-3 sm:px-5 py-20 space-y-1 sm:space-y-3">
        {/* Top 10 trending today */}
        <LazySection placeholder={<div className="h-[380px]" />}>
          <TopDaySlider title="Top 10 phim lẻ hôm nay" limit={10} />
        </LazySection>

        {/* Popular Movies */}
        <LazySection placeholder={<div className="h-[260px]" />}>
          <SliderMovie
            title="Phim Lẻ Phổ Biến"
            endpoint="/movie/popular"
            mediaType="movie"
            limit={15}
          />
        </LazySection>

        {/* Popular TV Series */}
        <LazySection placeholder={<div className="h-[260px]" />}>
          <SliderMovie
            title="Phim Bộ Phổ Biến"
            endpoint="/tv/popular"
            mediaType="tv"
            limit={15}
          />
        </LazySection>

        {/* Now Playing Movies - dedicated slider */}
        <LazySection placeholder={<div className="h-[260px]" />}>
          <NowPlayingSlider title="Phim \u0111ang Chi\u1ebfu R\u1ea1p" />
        </LazySection>

        {/* Top Rated Movies */}
        <LazySection placeholder={<div className="h-[260px]" />}>
          <SliderMovie
            title="Phim Lẻ Có Điểm Cao"
            endpoint="/movie/top_rated"
            mediaType="movie"
            limit={15}
          />
        </LazySection>

        {/* Top Rated TV Series */}
        <LazySection placeholder={<div className="h-[260px]" />}>
          <SliderMovie
            title="Phim Bộ Có Điểm Cao"
            endpoint="/tv/top_rated"
            mediaType="tv"
            limit={15}
          />
        </LazySection>
      </div>
    </div>
  );
};

export default Home;
