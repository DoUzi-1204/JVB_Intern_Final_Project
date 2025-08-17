import Banner from "../components/Banner/Banner";
import SliderMovie from "../components/SliderMovie";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen overflow-x-hidden">
      <Banner />

      {/* Movie Sliders Section */}
      <div className="w-full px-5 py-20 space-y-1 sm:space-y-3">
        {/* Popular Movies */}
        <SliderMovie
          title="Phim Lẻ Phổ Biến"
          endpoint="/movie/popular"
          mediaType="movie"
          limit={15}
        />

        {/* Popular TV Series */}
        <SliderMovie
          title="Phim Bộ Phổ Biến"
          endpoint="/tv/popular"
          mediaType="tv"
          limit={15}
        />

        {/* Top Rated Movies */}
        <SliderMovie
          title="Phim Lẻ Có Điểm Cao"
          endpoint="/movie/top_rated"
          mediaType="movie"
          limit={15}
        />

        {/* Top Rated TV Series */}
        <SliderMovie
          title="Phim Bộ Có Điểm Cao"
          endpoint="/tv/top_rated"
          mediaType="tv"
          limit={15}
        />
      </div>
    </div>
  );
};

export default Home;
