import { useState, useEffect } from "react";

const useMovieDetail = (id, isMovie) => {
  const [movieData, setMovieData] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [images, setImages] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [seasons, setSeasons] = useState(null);
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

        // Build API endpoints
        const endpoints = [
          `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=vi-VN`,
          `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`,
          `${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}&language=en-US`,
          `${BASE_URL}/${mediaType}/${id}/${
            isMovie ? "release_dates" : "content_ratings"
          }?api_key=${API_KEY}`,
          `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`,
          `${BASE_URL}/${mediaType}/${id}/images?api_key=${API_KEY}&include_image_language=vi,en,null`,
          `${BASE_URL}/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=vi-VN&page=1`,
        ];

        // Fetch all data in parallel
        const responses = await Promise.all(endpoints.map((url) => fetch(url)));
        const [
          detailViData,
          detailEnData,
          creditsData,
          certificationData,
          videosData,
          imagesData,
          recommendationsData,
        ] = await Promise.all(responses.map((response) => response.json()));

        // Process videos - filter for Official Trailers only
        const processedVideos = {
          ...videosData,
          results:
            videosData.results?.filter(
              (video) =>
                video.type === "Trailer" && video.name === "Official Trailer"
            ) || [],
        };

        // Process movie data with fallbacks
        const processedMovieData = {
          ...detailViData,
          titleEn: detailEnData[isMovie ? "title" : "name"],
          overview:
            detailViData.overview || detailEnData.overview || "Đang cập nhật",
          certifications: certificationData,
        };

        // Process credits - only cast, no crew
        const processedCredits = {
          cast: creditsData.cast || [],
          crew: [], // Removed crew data as requested
        };

        // Process recommendations - limit to 12 items
        const processedRecommendations = {
          ...recommendationsData,
          results: recommendationsData.results?.slice(0, 12) || [],
        };

        // Set processed data
        setMovieData(processedMovieData);
        setCredits(processedCredits);
        setVideos(processedVideos);
        setImages(imagesData);
        setRecommendations(processedRecommendations);
        setSeasons(!isMovie ? detailViData.seasons : null);
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

  return {
    movieData,
    credits,
    videos,
    images,
    recommendations,
    seasons,
    loading,
    error,
    titleEn: movieData?.titleEn || "", // Thêm dòng này
  };
};

export default useMovieDetail;
