import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/MovieDetail/Layout";
import useMovieDetail from "../hooks/useMovieDetail";

const MovieDetail = () => {
  const { id, type } = useParams();
  const movieData = useMovieDetail(id, type || "movie");

  if (movieData.loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (movieData.error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-300">{movieData.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Layout movieData={movieData} mediaType={type || "movie"} />
      <Footer />
    </div>
  );
};

export default MovieDetail;
