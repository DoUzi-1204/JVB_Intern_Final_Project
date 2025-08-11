import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useMovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [credits, setCredits] = useState(null);
  const [certification, setCertification] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  // Determine if it's a movie or TV show based on current path
  const isMovie = window.location.pathname.includes('/movie/');
  const mediaType = isMovie ? 'movie' : 'tv';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!API_KEY || !id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch main details
        const detailsResponse = await fetch(
          `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=vi-VN`
        );
        
        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }
        
        const detailsData = await detailsResponse.json();

        // Fetch English details for fallback
        const detailsEnResponse = await fetch(
          `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
        );
        const detailsEnData = await detailsEnResponse.json();

        // Merge data with English as fallback
        const mergedData = {
          ...detailsData,
          title_en: detailsEnData.title || detailsEnData.name,
          overview_en: detailsEnData.overview
        };

        setMovieData(mergedData);

        // Fetch credits
        const creditsResponse = await fetch(
          `${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`
        );
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);

        // Fetch certification
        const certificationsResponse = await fetch(
          `${BASE_URL}/${mediaType}/${id}/release_dates?api_key=${API_KEY}`
        );
        
        if (certificationsResponse.ok) {
          const certificationsData = await certificationsResponse.json();
          const usCertification = certificationsData.results?.find(
            result => result.iso_3166_1 === 'US'
          );
          if (usCertification?.release_dates?.[0]?.certification) {
            setCertification(usCertification.release_dates[0].certification);
          }
        }

        // For TV shows, fetch certification differently
        if (!isMovie) {
          const tvCertResponse = await fetch(
            `${BASE_URL}/tv/${id}/content_ratings?api_key=${API_KEY}`
          );
          if (tvCertResponse.ok) {
            const tvCertData = await tvCertResponse.json();
            const usCert = tvCertData.results?.find(
              result => result.iso_3166_1 === 'US'
            );
            if (usCert?.rating) {
              setCertification(usCert.rating);
            }
          }
        }

      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY, mediaType, isMovie]);

  // Helper functions
  const getDirectors = () => {
    if (!credits?.crew) return [];
    return credits.crew.filter(person => person.job === 'Director');
  };

  const getMainCast = () => {
    if (!credits?.cast) return [];
    return credits.cast.slice(0, 10); // Top 10 cast members
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return '';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    
    if (isMovie) {
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    } else {
      return `${runtime}m/tập`;
    }
  };

  const formatReleaseDate = (date) => {
    if (!date) return '';
    return new Date(date).getFullYear();
  };

  const getProductionCompanies = () => {
    if (!movieData?.production_companies) return [];
    return movieData.production_companies
      .filter(company => company.name)
      .slice(0, 3); // Top 3 companies
  };

  const getOriginCountries = () => {
    if (!movieData?.origin_country) return [];
    return movieData.origin_country;
  };

  return {
    movieData,
    credits,
    certification,
    loading,
    error,
    isMovie,
    mediaType,
    // Helper functions
    getDirectors,
    getMainCast,
    formatRuntime,
    formatReleaseDate,
    getProductionCompanies,
    getOriginCountries
  };
};

export default useMovieDetail;