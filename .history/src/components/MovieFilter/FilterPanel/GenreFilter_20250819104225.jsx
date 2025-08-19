import { useState, useEffect } from "react";
import { API_CONFIG } from "../../../utils/constants";

const GenreFilter = ({ selectedGenres, onChange }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      if (!API_KEY) return;

      try {
        const [movieGenresRes, tvGenresRes] = await Promise.all([
          fetch(
            `${API_CONFIG.BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=vi-VN`
          ),
          fetch(
            `${API_CONFIG.BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=vi-VN`
          ),
        ]);

        const movieGenresData = await movieGenresRes.json();
        const tvGenresData = await tvGenresRes.json();

        // Combine and deduplicate genres
        const allGenres = [
          ...(movieGenresData.genres || []),
          ...(tvGenresData.genres || []),
        ];
        const uniqueGenres = allGenres.filter(
          (genre, index, self) =>
            index === self.findIndex((g) => g.name === genre.name)
        );

        setGenres(uniqueGenres.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [API_KEY]);

  const handleGenreToggle = (genreId) => {
    const newSelectedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    onChange(newSelectedGenres);
  };

  const handleSelectAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-2">
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
        </div>
      ) : (
        <div className="flex items-start gap-4 px-9">
          <h3 className="text-white font-medium text-sm w-24 text-right flex-shrink-0">
            Thể loại:
          </h3>

          <div className="flex flex-wrap gap-2 flex-1">
            {/* Tất cả button */}
            <button
              onClick={handleSelectAll}
              className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 border ${
                selectedGenres.length === 0
                  ? "border-yellow-500 text-yellow-500"
                  : "border-gray-700 text-gray-300 hover:border-gray-600 hover:text-yellow-300"
              }`}
            >
              Tất cả
            </button>

            {/* Genre buttons */}
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreToggle(genre.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 border ${
                  selectedGenres.includes(genre.id)
                    ? "border-yellow-500 text-yellow-500"
                    : "border-gray-700 text-gray-300 hover:border-gray-600 hover:text-yellow-300"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
