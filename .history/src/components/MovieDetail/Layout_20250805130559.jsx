import HeroSection from "./HeroSection";
import MovieInfo from "./SideBar/MovieInfo";
import ActionButtons from "./MainContent/ActionButtons";

const Layout = ({
  movieData,
  credits,
  mediaType,
  loading,
  error,
  getBackdropUrl,
  getPosterUrl,
  getCertification,
  formatRuntime,
  formatReleaseYear,
  getDirectors,
  getCast,
  getTitle,
  getOverview,
  getOriginCountries,
  getProductionCompanies,
  getLastEpisode,
}) => {
  if (loading) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl();
  const posterUrl = getPosterUrl();

  return (
    <div className="relative bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <HeroSection backdropUrl={backdropUrl} />

      {/* Detail Container - overlaps bottom 1/3 of hero section */}
      <div className="relative -mt-80 z-20">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="flex-shrink-0">
              <MovieInfo
                movieData={movieData}
                mediaType={mediaType}
                posterUrl={posterUrl}
                getCertification={getCertification}
                formatRuntime={formatRuntime}
                formatReleaseYear={formatReleaseYear}
                getDirectors={getDirectors}
                getCast={getCast}
                getTitle={getTitle}
                getOverview={getOverview}
                getOriginCountries={getOriginCountries}
                getProductionCompanies={getProductionCompanies}
                getLastEpisode={getLastEpisode}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <ActionButtons movieData={movieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
