import { useState, useEffect } from "react";

const useMovieDetail = (movieId, mediaType = "movie") => {
  const [movieData, setMovieData] = useState({
    details: null,
    detailsEn: null,
    credits: null,
    images: null,
    certification: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    if (!movieId || !API_KEY) return;

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = mediaType === "movie" ? "movie" : "tv";

        // Fetch movie details in Vietnamese
        const detailsResponse = await fetch(
          `${BASE_URL}/${endpoint}/${movieId}?api_key=${API_KEY}&language=vi-VN&append_to_response=release_dates,content_ratings`
        );
        const details = await detailsResponse.json();

        // Fetch movie details in English
        const detailsEnResponse = await fetch(
          `${BASE_URL}/${endpoint}/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        const detailsEn = await detailsEnResponse.json();

        // Fetch credits
        const creditsResponse = await fetch(
          `${BASE_URL}/${endpoint}/${movieId}/credits?api_key=${API_KEY}`
        );
        const credits = await creditsResponse.json();

        // Fetch images
        const imagesResponse = await fetch(
          `${BASE_URL}/${endpoint}/${movieId}/images?api_key=${API_KEY}`
        );
        const images = await imagesResponse.json();

        // Get certification
        let certification = "NR";
        if (mediaType === "movie" && details.release_dates?.results) {
          const usRelease = details.release_dates.results.find(
            (release) => release.iso_3166_1 === "US"
          );
          if (usRelease && usRelease.release_dates.length > 0) {
            certification = usRelease.release_dates[0].certification || "NR";
          }
        } else if (mediaType === "tv" && details.content_ratings?.results) {
          const usRating = details.content_ratings.results.find(
            (rating) => rating.iso_3166_1 === "US"
          );
          if (usRating) {
            certification = usRating.rating || "NR";
          }
        }

        setMovieData({
          details,
          detailsEn,
          credits,
          images,
          certification,
        });
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError("Failed to fetch movie data");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId, mediaType, API_KEY]);

  // Helper functions
  const getDirector = () => {
    if (!movieData.credits?.crew) return null;
    return movieData.credits.crew.find((person) => person.job === "Director");
  };

  const getMainCast = (limit = 5) => {
    if (!movieData.credits?.cast) return [];
    return movieData.credits.cast.slice(0, limit);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mediaType === "movie") {
      return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
    } else {
      return `${minutes}m/tập`;
    }
  };

  const getProductionCompanies = () => {
    return movieData.details?.production_companies || [];
  };

  const getOriginCountries = () => {
    return (
      movieData.details?.origin_country ||
      movieData.details?.production_countries?.map((c) => c.name) ||
      []
    );
  };

  const getTitle = () => {
    const viTitle =
      movieData.details?.[mediaType === "movie" ? "title" : "name"];
    const enTitle =
      movieData.detailsEn?.[mediaType === "movie" ? "title" : "name"];

    return {
      vietnamese: viTitle,
      english: enTitle,
      display: viTitle || enTitle,
    };
  };

  const getReleaseYear = () => {
    const date =
      movieData.details?.[
        mediaType === "movie" ? "release_date" : "first_air_date"
      ];
    return date ? new Date(date).getFullYear() : null;
  };

  const getLastEpisode = () => {
    if (mediaType !== "tv") return null;
    return movieData.details?.last_episode_to_air;
  };

  return {
    ...movieData,
    loading,
    error,
    getDirector,
    getMainCast,
    formatRuntime,
    getProductionCompanies,
    getOriginCountries,
    getTitle,
    getReleaseYear,
    getLastEpisode,
  };
};

export default useMovieDetail;
