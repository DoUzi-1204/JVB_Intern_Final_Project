import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import SliderMovie from "../components/SliderMovie";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen overflow-x-hidden">
      <Header />
      <Banner />

      {/* Movie Sliders Section */}
      <div className="container mx-auto px-6 py-20 space-y-10">
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
      <Footer />
    </div>
  );
};

export default Home;
