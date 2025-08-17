import useBanner from "../../hooks/useBanner";
import InforFilm from "./InforFilm";
import PosterFilm from "./PosterFilm";

const Banner = () => {
  const {
    movies,
    currentMovie,
    setCurrentMovie,
    movieDetails,
    movieDetailsEn,
    movieImages,
    loading,
    error,
    IMAGE_BASE_URL,
  } = useBanner();

  const getMovieLogo = () => {
    const currentImages = movieImages[currentMovie?.id];
    if (!currentImages?.logos) return null;

    let logo = currentImages.logos.find((logo) => logo.iso_639_1 === "vi");
    if (!logo)
      logo = currentImages.logos.find((logo) => logo.iso_639_1 === "en");
    if (!logo && currentImages.logos.length > 0) logo = currentImages.logos[0];

    return logo ? `${IMAGE_BASE_URL}/w500${logo.file_path}` : null;
  };

  const getCertification = () => {
    const currentDetails = movieDetails[currentMovie?.id];
    if (!currentDetails?.release_dates?.results) return "NR";

    const usRelease = currentDetails.release_dates.results.find(
      (release) => release.iso_3166_1 === "US"
    );
    return usRelease?.release_dates?.[0]?.certification || "NR";
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  };

  const formatReleaseYear = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : "";
  };

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Error: {error}
      </div>
    );
  if (loading || !currentMovie)
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  const backdropUrl = currentMovie?.backdrop_path
    ? `${IMAGE_BASE_URL}/original${currentMovie.backdrop_path}`
    : "";

  return (
    <div
      className="relative w-full overflow-hidden
             h-[280px]
             xsm:h-[330px]
             xs:h-[400px]
             sm:h-[450px]
             md:h-[530px]
             lg:h-[610px]
             xl:h-[690px]
             2xl:h-[760px]"
    >
      {/* Background */}
      <img
        src={backdropUrl}
        alt={currentMovie.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay Radial Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 0.05px, transparent 1px)`,
          backgroundSize: "2px 2px",
          zIndex: 1,
        }}
      ></div>

      {/* Gradient Edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 20%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%),
            linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 20%),
            linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 20%)
          `,
          zIndex: 2,
        }}
      ></div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 via-black/60 to-transparent z-3"></div>

      {/* Content */} 
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-8 flex flex-col lg:flex-row items-center h-full gap-8">
          <div className="pl-8 sm:pl-12 lg:pl-16 w-full">
            <InforFilm
              currentMovie={currentMovie}
              currentDetails={movieDetails[currentMovie.id]}
              currentDetailsEn={movieDetailsEn[currentMovie.id]}
              getMovieLogo={getMovieLogo}
              getCertification={getCertification}
              formatRuntime={formatRuntime}
              formatReleaseYear={formatReleaseYear}
            />
          </div>
          <PosterFilm
            movies={movies}
            currentMovie={currentMovie}
            setCurrentMovie={setCurrentMovie}
            IMAGE_BASE_URL={IMAGE_BASE_URL}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
