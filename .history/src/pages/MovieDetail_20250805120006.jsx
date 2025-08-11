import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/MovieDetail/Layout";
import useMovieDetail from "../hooks/useMovieDetail";

const MovieDetail = () => {
  const { id } = useParams();
  const {
    movieData,
    credits,
    loading,
    error,
    mediaType,
    getCertification,
    formatRuntime,
    formatReleaseYear,
    getDirectors,
    getCast,
    getTitle,
    getOverview,
    getBackdropUrl,
    getPosterUrl,
  } = useMovieDetail();

  // Debug log
  console.log("MovieDetail rendered with:", { id, loading, error, movieData });

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading movie details...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-gray-300">{error}</p>
            <p className="text-gray-400 mt-2">Movie ID: {id}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Layout
        movieData={movieData}
        credits={credits}
        mediaType={mediaType}
        loading={loading}
        error={error}
        getBackdropUrl={getBackdropUrl}
        getPosterUrl={getPosterUrl}
        getCertification={getCertification}
        formatRuntime={formatRuntime}
        formatReleaseYear={formatReleaseYear}
        getDirectors={getDirectors}
        getCast={getCast}
        getTitle={getTitle}
        getOverview={getOverview}
      />
      <Footer />
    </>
  );
};

export default MovieDetail;
