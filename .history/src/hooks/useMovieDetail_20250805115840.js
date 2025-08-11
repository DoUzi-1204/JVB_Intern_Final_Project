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

  useEffect(() => {
    if (!id || !API_KEY) {
      console.log("Missing id or API_KEY:", { id, API_KEY: !!API_KEY });
      return;
    }

    const fetchMovieDetail = async () => {
      console.log("Starting fetch for id:", id);
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
        console.log("Successfully fetched data:", {
          viData,
          enData,
          creditsData,
        });
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
    const data = movieData.vi;
    if (!data) return "NR";

    if (mediaType === "movie") {
      const usRelease = data.release_dates?.results?.find(
        (release) => release.iso_3166_1 === "US"
      );
      return usRelease?.release_dates?.[0]?.certification || "NR";
    } else {
      const usRating = data.content_ratings?.results?.find(
        (rating) => rating.iso_3166_1 === "US"
      );
      return usRating?.rating || "NR";
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";

    if (mediaType === "movie") {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
    } else {
      return `${minutes}m/tập`;
    }
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
    const viTitle = movieData.vi?.[mediaType === "movie" ? "title" : "name"];
    const enTitle = movieData.en?.[mediaType === "movie" ? "title" : "name"];

    return {
      vi: viTitle || enTitle,
      en: enTitle,
    };
  };

  const getOverview = () => {
    return movieData.vi?.overview || movieData.en?.overview || "";
  };

  const getBackdropUrl = () => {
    const backdropPath =
      movieData.vi?.backdrop_path || movieData.en?.backdrop_path;
    return backdropPath
      ? `https://image.tmdb.org/t/p/original${backdropPath}`
      : "";
  };

  const getPosterUrl = () => {
    const posterPath = movieData.vi?.poster_path || movieData.en?.poster_path;
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "";
  };

  return {
    movieData,
    credits,
    loading,
    error,
    mediaType,
    // Helper functions
    getCertification,
    formatRuntime,
    formatReleaseYear,
    getDirectors,
    getCast,
    getTitle,
    getOverview,
    getBackdropUrl,
    getPosterUrl,
  };
};

export default useMovieDetail;
