import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/MovieDetail/Layout";
import useMovieDetail from "../hooks/useMovieDetail";

const MovieDetail = () => {
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
