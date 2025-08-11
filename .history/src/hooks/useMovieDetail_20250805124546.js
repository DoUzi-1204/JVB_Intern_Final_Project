import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useMovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
    vi: null,
    en: null,
  });
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  useEffect(() => {
    if (!id || !API_KEY) {
      setError("Missing movie ID or API key");
      setLoading(false);
      return;
    }

    const fetchMovieDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        // Determine media type from URL path
        const currentPath = window.location.pathname;
        const type = currentPath.includes("/tv/") ? "tv" : "movie";
        setMediaType(type);

        const endpoint = type === "movie" ? "movie" : "tv";

        // Fetch Vietnamese data
        const viResponse = await fetch(
          `${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}&language=vi-VN&append_to_response=release_dates,content_ratings`
        );

        if (!viResponse.ok) {
          throw new Error(`HTTP error! status: ${viResponse.status}`);
        }

        const viData = await viResponse.json();

        // Fetch English data
        const enResponse = await fetch(
          `${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates,content_ratings`
        );

        if (!enResponse.ok) {
          throw new Error(`HTTP error! status: ${enResponse.status}`);
        }

        const enData = await enResponse.json();

        // Fetch credits
        const creditsResponse = await fetch(
          `${BASE_URL}/${endpoint}/${id}/credits?api_key=${API_KEY}`
        );

        if (!creditsResponse.ok) {
          throw new Error(`HTTP error! status: ${creditsResponse.status}`);
        }

        const creditsData = await creditsResponse.json();

        setMovieData({
          vi: viData,
          en: enData,
        });
        setCredits(creditsData);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, API_KEY]);

  // Helper functions
  const getCertification = () => {
    if (!movieData.vi) return "NR";

    if (mediaType === "movie") {
      const usRelease = movieData.vi.release_dates?.results?.find(
        (release) => release.iso_3166_1 === "US"
      );
      return usRelease?.release_dates?.[0]?.certification || "NR";
    } else {
      const usRating = movieData.vi.content_ratings?.results?.find(
        (rating) => rating.iso_3166_1 === "US"
      );
      return usRating?.rating || "NR";
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mediaType === "tv") {
      return `${minutes}m/tập`;
    }

    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  };

  const formatReleaseYear = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : "";
  };

  const getDirectors = () => {
    if (!credits?.crew) return [];
    return credits.crew.filter((person) => person.job === "Director");
  };

  const getCast = () => {
    if (!credits?.cast) return [];
    return credits.cast.slice(0, 10); // Get top 10 cast members
  };

  const getTitle = () => {
    const viTitle = movieData.vi?.title || movieData.vi?.name;
    const enTitle = movieData.en?.title || movieData.en?.name;

    return {
      vi: viTitle,
      en: enTitle,
      display: viTitle || enTitle,
    };
  };

  const getOverview = () => {
    return movieData.vi?.overview || movieData.en?.overview || "";
  };

  const getBackdropUrl = () => {
    const backdropPath =
      movieData.vi?.backdrop_path || movieData.en?.backdrop_path;
    return backdropPath ? `${IMAGE_BASE_URL}/original${backdropPath}` : "";
  };

  const getPosterUrl = () => {
    const posterPath = movieData.vi?.poster_path || movieData.en?.poster_path;
    return posterPath ? `${IMAGE_BASE_URL}/w500${posterPath}` : "";
  };

  const getOriginCountries = () => {
    return movieData.vi?.origin_country || movieData.en?.origin_country || [];
  };

  const getProductionCompanies = () => {
    return (
      movieData.vi?.production_companies ||
      movieData.en?.production_companies ||
      []
    );
  };

  const getLastEpisode = () => {
    if (mediaType === "tv") {
      return (
        movieData.vi?.last_episode_to_air || movieData.en?.last_episode_to_air
      );
    }
    return null;
  };

  return {
    movieData,
    credits,
    loading,
    error,
    mediaType,
    getCertification,
    formatRuntime,
    formatReleaseYear,
    getDirectors,
    getCast,
    getTitle,
    getOverview,
    getBackdropUrl,
    getPosterUrl,
    getOriginCountries,
    getProductionCompanies,
    getLastEpisode,
  };
};

export default useMovieDetail;
