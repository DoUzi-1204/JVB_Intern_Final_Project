import { useState, useEffect, useCallback } from "react";
import { API_CONFIG } from "../utils/constants";

const useBanner = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});
  const [movieDetailsEn, setMovieDetailsEn] = useState({});
  const [movieImages, setMovieImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "/api";
  const IMAGE_BASE_URL = API_CONFIG.IMAGE_BASE_URL;

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?language=vi-VN&page=1`
        );
        const data = await response.json();
        const popularMovies = data.results.slice(0, 6);
        setMovies(popularMovies);
        if (popularMovies.length > 0) {
          setCurrentMovie(popularMovies[0]);
        }
      } catch {
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMovies();
  }, []);

  const fetchMovieDetails = useCallback(
    async (movieId) => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}?language=vi-VN&append_to_response=release_dates`
        );
        const data = await response.json();
        setMovieDetails((prev) => ({ ...prev, [movieId]: data }));
      } catch {
        // Silent error
      }
    },
    [BASE_URL]
  );

  const fetchMovieDetailsEn = useCallback(
    async (movieId) => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}?language=en-US`
        );
        const data = await response.json();
        setMovieDetailsEn((prev) => ({ ...prev, [movieId]: data }));
      } catch {
        // Silent error
      }
    },
    [BASE_URL]
  );

  const fetchMovieImages = useCallback(
    async (movieId) => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/images`);
        const data = await response.json();
        setMovieImages((prev) => ({ ...prev, [movieId]: data }));
      } catch {
        // Silent error
      }
    },
    [BASE_URL]
  );

  useEffect(() => {
    if (currentMovie) {
      if (!movieDetails[currentMovie.id]) {
        fetchMovieDetails(currentMovie.id);
      }
      if (!movieDetailsEn[currentMovie.id]) {
        fetchMovieDetailsEn(currentMovie.id);
      }
      if (!movieImages[currentMovie.id]) {
        fetchMovieImages(currentMovie.id);
      }
    }
  }, [
    currentMovie,
    movieDetails,
    movieDetailsEn,
    movieImages,
    fetchMovieDetails,
    fetchMovieDetailsEn,
    fetchMovieImages,
  ]);

  return {
    movies,
    currentMovie,
    movieDetails,
    movieDetailsEn,
    movieImages,
    loading,
    error,
  };
};

export default useBanner;
