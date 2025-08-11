import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!API_KEY) {
        setError("API key not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=vi-VN&append_to_response=videos,images,credits`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id, API_KEY]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-300">{error || "Movie not found"}</p>
        </div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movie.backdrop_path}`
    : "";

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : "";

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 flex items-center">
            {/* Poster */}
            <div className="flex-shrink-0 mr-8">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-80 h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 max-w-2xl space-y-4 text-left text-white">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              
              {movie.tagline && (
                <p className="text-xl text-yellow-300 italic">"{movie.tagline}"</p>
              )}

              <div className="flex items-center space-x-4">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-3 py-1 rounded text-sm font-normal">
                  TMDB {movie.vote_average?.toFixed(1)}
                </span>
                <span className="bg-white/10 border border-white px-3 py-1 rounded text-sm">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                {movie.runtime && (
                  <span className="bg-white/10 border border-white px-3 py-1 rounded text-sm">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-lg leading-relaxed">{movie.overview}</p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                <button className="bg-gradient-to-r from-yellow-100 to-yellow-400 backdrop-blur-sm text-black px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-colors flex items-center space-x-2">
                  <span>Xem phim</span>
                </button>

                <button className="border border-white/50 bg-gray-600/50 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold transition-colors hover:text-yellow-300">
                  Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;