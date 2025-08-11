import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MovieDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Movie Detail Page</h1>
          <p className="text-xl mb-2">Movie ID: {id}</p>
          <p className="text-gray-300">
            This is the movie detail page for movie {id}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetail;
