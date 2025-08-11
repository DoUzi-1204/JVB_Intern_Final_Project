import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useMovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [credits, setCredits] = useState(null);
  const [certification, setCertification] = useState("NR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  // Determine if it's a movie or TV show based on current path
  const currentPath = window.location.pathname;
  const isMovie = currentPath.includes("/movie/");
  const mediaType = isMovie ? "movie" : "tv";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!API_KEY || !id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch main details in both Vietnamese and English
        const [viResponse, enResponse, creditsResponse, certificationResponse] = await Promise.all([
          fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=vi-VN`),
          fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/${mediaType}/${id}/${isMovie ? 'release_dates' : 'content_ratings'}?api_key=${API_KEY}`)
        ]);

        if (!viResponse.ok || !enResponse.ok || !creditsResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const [viData, enData, creditsData, certificationData] = await Promise.all([
          viResponse.json(),
          enResponse.json(),
          creditsResponse.json(),
          certificationResponse.json()
        ]);

        setMovieData({ vi: viData, en: enData });
        setCredits(creditsData);

        // Get certification
        if (isMovie) {
          const usRelease = certificationData.results?.find(
            (release) => release.iso_3166_1 === "US"
          );
          setCertification(usRelease?.release_dates?.[0]?.certification || "NR");
        } else {
          const usRating = certificationData.results?.find(
            (rating) => rating.iso_3166_1 === "US"
          );
          setCertification(usRating?.rating || "NR");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, API_KEY, mediaType, isMovie]);

  // Helper functions
  const getBackdropUrl = () => {
    const backdrop = movieData?.vi?.backdrop_path || movieData?.en?.backdrop_path;
    return backdrop ? `${IMAGE_BASE_URL}/original${backdrop}` : null;
  };

  const getPosterUrl = () => {
    const poster = movieData?.vi?.poster_path || movieData?.en?.poster_path;
    return poster ? `${IMAGE_BASE_URL}/w500${poster}` : null;
  };

  const getTitle = () => {
    if (isMovie) {
      return {
        vi: movieData?.vi?.title || movieData?.en?.title || "",
        en: movieData?.en?.title || ""
      };
    } else {
      return {
        vi: movieData?.vi?.name || movieData?.en?.name || "",
        en: movieData?.en?.name || ""
      };
    }
  };

  const getOverview = () => {
    return movieData?.vi?.overview || movieData?.en?.overview || "";
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatReleaseDate = () => {
    const date = isMovie 
      ? (movieData?.vi?.release_date || movieData?.en?.release_date)
      : (movieData?.vi?.first_air_date || movieData?.en?.first_air_date);
    
    if (!date) return "";
    return new Date(date).getFullYear();
  };

  const getDirectors = () => {
    if (!credits?.crew) return [];
    return credits.crew.filter(person => person.job === "Director");
  };

  const getMainCast = () => {
    if (!credits?.cast) return [];
    return credits.cast.slice(0, 6); // Get top 6 cast members
  };

  const getProductionCompanies = () => {
    const companies = movieData?.vi?.production_companies || movieData?.en?.production_companies || [];
    return companies.slice(0, 3); // Get top 3 companies
  };

  const getOriginCountries = () => {
    if (isMovie) {
      return movieData?.vi?.production_countries || movieData?.en?.production_countries || [];
    } else {
      return movieData?.vi?.origin_country || movieData?.en?.origin_country || [];
    }
  };

  const getLastEpisode = () => {
    if (isMovie) return null;
    return movieData?.vi?.last_episode_to_air || movieData?.en?.last_episode_to_air;
  };

  const getRating = () => {
    const rating = movieData?.vi?.vote_average || movieData?.en?.vote_average;
    return rating ? rating.toFixed(1) : "N/A";
  };

  return {
    movieData,
    credits,
    certification,
    loading,
    error,
    isMovie,
    mediaType,
    getBackdropUrl,
    getPosterUrl,
    getTitle,
    getOverview,
    formatRuntime,
    formatReleaseDate,
    getDirectors,
    getMainCast,
    getProductionCompanies,
    getOriginCountries,
    getLastEpisode,
    getRating
  };
};

export default useMovieDetail;
