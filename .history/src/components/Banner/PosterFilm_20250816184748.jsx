import Image404 from "./404Image";

const PosterFilm = ({
  movies,
  currentMovie,
  setCurrentMovie,
  IMAGE_BASE_URL,
}) => {
  return (
    <div className="hidden lg:flex flex-col space-y-3 absolute bottom-8 right-8">
      <div className="flex space-x-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`cursor-pointer transition-all duration-300 transform rounded-lg ${
              currentMovie.id === movie.id
                ? "scale-125 ring-2 ring-white"
                : "scale-100 hover:scale-110"
            }`}
            onClick={() => setCurrentMovie(movie)}
          >
            <Image404
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}/w200${movie.poster_path}`
                  : null
              }
              alt={movie.title}
              className="w-16 h-24 object-cover rounded-lg shadow-lg"
              type="poster"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosterFilm;
