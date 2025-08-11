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

        // Fetch both Vietnamese and English data
        const [
          detailViResponse,
          detailEnResponse,
          creditsResponse,
          certificationResponse,
          videosResponse,
          imagesResponse,
          recommendationsResponse,
        ] = await Promise.all([
          fetch(
            `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=vi-VN`
          ),
          fetch(
            `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
          ),
          fetch(
            `${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}&language=en-US`
          ),
          fetch(
            `${BASE_URL}/${mediaType}/${id}/${
              isMovie ? "release_dates" : "content_ratings"
            }?api_key=${API_KEY}`
          ),
          fetch(
            `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=vi-VN`
          ),
          fetch(
            `${BASE_URL}/${mediaType}/${id}/images?api_key=${API_KEY}&include_image_language=vi,en,null`
          ),
          fetch(
            `${BASE_URL}/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=vi-VN&page=1`
          ),
        ]);

        const detailViData = await detailViResponse.json();
        const detailEnData = await detailEnResponse.json();
        const creditsData = await creditsResponse.json();
        const certificationData = await certificationResponse.json();
        const videosData = await videosResponse.json();
        const imagesData = await imagesResponse.json();
        const recommendationsData = await recommendationsResponse.json();

        // If no Vietnamese videos, fetch English videos
        let finalVideosData = videosData;
        if (!videosData.results || videosData.results.length === 0) {
          const videosEnResponse = await fetch(
            `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`
          );
          finalVideosData = await videosEnResponse.json();
        }

        // Fetch seasons data for TV series
        let seasonsData = null;
        if (!isMovie && detailViData.seasons) {
          seasonsData = detailViData.seasons;
        }

        // Combine data with both Vietnamese and English titles and fallback overview
        const enhancedMovieData = {
          ...detailViData,
          titleEn: detailEnData[isMovie ? "title" : "name"],
          // Fallback overview: ưu tiên tiếng Việt, nếu không có thì dùng tiếng Anh, cuối cùng là "Đang cập nhật"
          overview:
            detailViData.overview || detailEnData.overview || "Đang cập nhật",
          certifications: certificationData,
        };

        setMovieData(enhancedMovieData);
        setCredits(creditsData);
        setVideos(finalVideosData);
        setImages(imagesData);
        setRecommendations(recommendationsData);
        setSeasons(seasonsData);
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

  return { movieData, credits, videos, images, recommendations, seasons, loading, error };
};

export default useMovieDetail;
