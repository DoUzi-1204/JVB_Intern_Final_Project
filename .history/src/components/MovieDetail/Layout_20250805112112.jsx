import HeroSection from "./HeroSection";
import MovieInfo from "./SideBar/MovieInfo";
import ActionButtons from "./MainContent/ActionButtons";

const Layout = ({ movieData, mediaType = "movie" }) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection movieData={movieData} mediaType={mediaType} />

      {/* Detail Container - overlapping bottom 1/3 of hero section */}
      <div className="relative -mt-80 z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Movie Info */}
            <div className="lg:col-span-1">
              <MovieInfo movieData={movieData} mediaType={mediaType} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg">
                <ActionButtons />
                {/* Additional main content can be added here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
