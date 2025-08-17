import Banner from "../components/Banner/Banner";
import SliderMovie from "../components/SliderMovie";

const Home = () => {
  return (
    // Cho phép overflow-x ẩn để slider không tràn, overflow-y-visible để popup hover không bị cắt
    <div className="bg-gray-900 min-h-screen overflow-x-hidden overflow-y-visible">
      <Banner />

      {/* Movie Sliders Section */}
      <div className="container px-7 py-20 space-y-10">
        <SliderMovie
          title="Phim Lẻ Phổ Biến"
          endpoint="/movie/popular"
          mediaType="movie"
          limit={15}
        />
        <SliderMovie
          title="Phim Bộ Phổ Biến"
          endpoint="/tv/popular"
          mediaType="tv"
          limit={15}
        />
        <SliderMovie
          title="Phim Lẻ Có Điểm Cao"
          endpoint="/movie/top_rated"
          mediaType="movie"
          limit={15}
        />
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
