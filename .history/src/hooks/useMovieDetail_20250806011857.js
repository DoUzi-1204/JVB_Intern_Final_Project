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

        // Fetch movie/TV data with certifications
        const [detailResponse, creditsResponse, certificationResponse] =
          await Promise.all([
            fetch(
              `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=vi-VN`
            ),
            fetch(
              `${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}&language=vi-VN`
            ),
            fetch(
              `${BASE_URL}/${mediaType}/${id}/${
                isMovie ? "release_dates" : "content_ratings"
              }?api_key=${API_KEY}`
            ),
          ]);

        const detailData = await detailResponse.json();
        const creditsData = await creditsResponse.json();
        const certificationData = await certificationResponse.json();

        // Add certification data to movie data
        const enhancedMovieData = {
          ...detailData,
          certifications: certificationData,
        };

        setMovieData(enhancedMovieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movie details:", err);
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
