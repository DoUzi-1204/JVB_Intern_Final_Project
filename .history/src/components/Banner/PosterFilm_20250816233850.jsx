import Image404 from "../404Image";

const PosterFilm = ({
  movies,
  currentMovie,
  setCurrentMovie,
  IMAGE_BASE_URL,
}) => {
  return (
    <div className="flex flex-col space-y-3 absolute bottom-9 xs:bottom-12 sm:bottom-12 sm:right-8 sm:flex-row sm:space-x-3 w-full sm:w-auto items-center justify-center lg:flex-row lg:space-x-3">
      <div className="flex space-x-3 justify-center w-full sm:w-auto">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`
          cursor-pointer transition-all duration-300 transform
          ${
            currentMovie.id === movie.id
              ? "scale-125 ring-2 ring-white"
              : "scale-100 hover:scale-110"
          }
          lg:rounded-lg rounded-full
        `}
            onClick={() => setCurrentMovie(movie)}
          >
            <Image404
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}/w200${movie.poster_path}`
                  : null
              }
              alt={movie.title}
              className="w-7 h-7 lg:w-16 lg:h-24 object-cover shadow-lg rounded-full lg:rounded-lg"
              type="poster"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosterFilm;
