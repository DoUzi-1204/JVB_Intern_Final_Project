import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovieDetails } from "../store/movieDetailsSlice";
import { API_CONFIG } from "../utils/constants";

const useBanner = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [movieDetailsEn, setMovieDetailsEn] = useState({});
  const [movieImages, setMovieImages] = useState({});
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movieDetails || {});
  // local caches for EN/details/images that are not global
  const [localDetailsEn, setLocalDetailsEn] = useState({});
  const [localImages, setLocalImages] = useState({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use server proxy to avoid exposing API key
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
  }, [BASE_URL]);

  const fetchMovieDetails = useCallback(
    async (movieId) => {
      try {
        // if already in global store, do nothing
        if (movieDetails && movieDetails[movieId]) return movieDetails[movieId];
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}?language=vi-VN&append_to_response=release_dates`
        );
        const data = await response.json();
        // put into redux store to share across components
        dispatch(setMovieDetails({ movieId, data }));
        return data;
      } catch {
        // Silent error
      }
    },
    [BASE_URL, dispatch, movieDetails]
  );

  const fetchMovieDetailsEn = useCallback(
    async (movieId) => {
      try {
    // keep EN details in local cache only
    if (localDetailsEn[movieId]) return localDetailsEn[movieId];
    const response = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US`);
    const data = await response.json();
    setLocalDetailsEn((prev) => ({ ...prev, [movieId]: data }));
    return data;
      } catch {
        // Silent error
      }
    },
  [BASE_URL, localDetailsEn]
  );

  const fetchMovieImages = useCallback(
    async (movieId) => {
      try {
    if (localImages[movieId]) return localImages[movieId];
    const response = await fetch(`${BASE_URL}/movie/${movieId}/images`);
    const data = await response.json();
    setLocalImages((prev) => ({ ...prev, [movieId]: data }));
    return data;
      } catch {
        // Silent error
      }
    },
  [BASE_URL, localImages]
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
    setCurrentMovie,
    movieDetails,
    movieDetailsEn,
    movieImages,
    loading,
    error,
    BASE_URL,
    IMAGE_BASE_URL,
  };
};

export default useBanner;
