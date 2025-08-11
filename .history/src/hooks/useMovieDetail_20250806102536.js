import { useState, useEffect } from "react";

const useMovieDetail = (id, isMovie) => {
  const [movieData, setMovieData] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!API_KEY || !id) return;

      setLoading(true);
      setError(null);

      try {
        const mediaType = isMovie ? "movie" : "tv";

        // Fetch tiếng Việt
        const responseVi = await fetch(
          `${BASE_URL}/${mediaType}/${id}?language=vi-VN&api_key=${API_KEY}`
        );
        const dataVi = await responseVi.json();

        // Fetch tiếng Anh để làm fallback
        const responseEn = await fetch(
          `${BASE_URL}/${mediaType}/${id}?language=en-US&api_key=${API_KEY}`
        );
        const dataEn = await responseEn.json();

        // Combine data với fallback logic
        const combinedData = {
          ...dataVi,
          titleEn: dataEn[isMovie ? "title" : "name"],
          // Fallback overview: ưu tiên tiếng Việt, nếu không có thì dùng tiếng Anh
          overview: dataVi.overview || dataEn.overview,
          // Các field khác cũng có thể fallback tương tự
        };

        setMovieData(combinedData);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id, isMovie, API_KEY]);

  return { movieData, credits, loading, error };
};

export default useMovieDetail;
