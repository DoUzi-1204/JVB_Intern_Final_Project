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
        const allGenres = [...(movieGenresData.genres || []), ...(tvGenresData.genres || [])];
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

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold text-lg">Thể loại</h3>
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-800/50 transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenreToggle(genre.id)}
                className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <span className="text-white text-sm">{genre.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
