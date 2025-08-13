import { useState, useCallback, useRef } from "react";
import { API_CONFIG } from "../utils/constants";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    movies: [],
    tv: [],
    people: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Fetch movie/TV details to get Vietnamese title and runtime
  const fetchDetailedInfo = useCallback(
    async (item) => {
      try {
        const endpoint = item.media_type === "movie" ? "movie" : "tv";
        const appendResponse = item.media_type === "movie" ? "release_dates" : "content_ratings";

        // Fetch Vietnamese info with additional data
        const viResponse = await fetch(
          `${API_CONFIG.BASE_URL}/${endpoint}/${item.id}?api_key=${API_KEY}&language=vi-VN&append_to_response=${appendResponse}`
        );
        const viData = await viResponse.json();

        // Fetch English info with additional data
        const enResponse = await fetch(
          `${API_CONFIG.BASE_URL}/${endpoint}/${item.id}?api_key=${API_KEY}&language=en-US&append_to_response=${appendResponse}`
        );
        const enData = await enResponse.json();

        // Get titles from "title" field
        const titleVi = viData.title || viData.name;
        const titleEn = enData.title || enData.name || item.title || item.name;

        // If no Vietnamese title, use English for both
        const displayTitleVi = titleVi || titleEn;
        const displayTitleEn = titleEn;

        // Get certification
        let certification = "NR";
        if (item.media_type === "movie") {
          const usRelease = enData.release_dates?.results?.find(
            (release) => release.iso_3166_1 === "US"
          );
          certification = usRelease?.release_dates?.[0]?.certification || "NR";
        } else {
          const usRating = enData.content_ratings?.results?.find(
            (rating) => rating.iso_3166_1 === "US"
          );
          certification = usRating?.rating || "NR";
        }

        let currentSeason = null;
        let currentEpisode = null;

        // For TV series, get current season and episode info
        if (item.media_type === "tv" && enData.number_of_seasons) {
          try {
            // Get the latest season that has aired
            const currentDate = new Date();
            let latestSeason = enData.number_of_seasons;
            
            // Try to get the latest season info
            const seasonResponse = await fetch(
              `${API_CONFIG.BASE_URL}/tv/${item.id}/season/${latestSeason}?api_key=${API_KEY}&language=en-US`
            );
            
            if (seasonResponse.ok) {
              const seasonData = await seasonResponse.json();
              
              // Find the latest aired episode
              const airedEpisodes = seasonData.episodes?.filter(ep => 
                ep.air_date && new Date(ep.air_date) <= currentDate
              ) || [];
              
              if (airedEpisodes.length > 0) {
                currentSeason = latestSeason;
                currentEpisode = airedEpisodes[airedEpisodes.length - 1].episode_number;
              } else {
                // If no episodes in latest season, try previous season
                if (latestSeason > 1) {
                  const prevSeasonResponse = await fetch(
                    `${API_CONFIG.BASE_URL}/tv/${item.id}/season/${latestSeason - 1}?api_key=${API_KEY}&language=en-US`
                  );
                  
                  if (prevSeasonResponse.ok) {
                    const prevSeasonData = await prevSeasonResponse.json();
                    const prevAiredEpisodes = prevSeasonData.episodes?.filter(ep => 
                      ep.air_date && new Date(ep.air_date) <= currentDate
                    ) || [];
                    
                    if (prevAiredEpisodes.length > 0) {
                      currentSeason = latestSeason - 1;
                      currentEpisode = prevAiredEpisodes[prevAiredEpisodes.length - 1].episode_number;
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.error("Error fetching season info:", error);
            // Fallback to basic info
            currentSeason = enData.number_of_seasons;
            currentEpisode = 1;
          }
        }

        return {
          ...item,
          title_vi: displayTitleVi,
          title_en: displayTitleEn,
          runtime: enData.runtime,
          number_of_seasons: enData.number_of_seasons,
          number_of_episodes: enData.number_of_episodes,
          current_season: currentSeason,
          current_episode: currentEpisode,
          certification: certification,
          release_date: enData.release_date || enData.first_air_date,
          vote_average: enData.vote_average || item.vote_average,
          overview: viData.overview || enData.overview || item.overview,
        };
      } catch (error) {
        console.error("Error fetching detailed info:", error);
        const fallbackTitle = item.title || item.name;
        return {
          ...item,
          title_vi: fallbackTitle,
          title_en: fallbackTitle,
          runtime: null,
          number_of_seasons: null,
          number_of_episodes: null,
          current_season: null,
          current_episode: null,
          certification: "NR",
          release_date: item.release_date || item.first_air_date,
          vote_average: item.vote_average,
          overview: item.overview,
        };
      }
    },
    [API_KEY]
  );

  const searchMulti = useCallback(
    async (searchQuery, page = 1) => {
      if (!searchQuery.trim() || !API_KEY) {
        setResults({ movies: [], tv: [], people: [], total: 0 });
        return { movies: [], tv: [], people: [], total: 0 };
      }

      setLoading(true);

      try {
        const response = await fetch(
          `${
            API_CONFIG.BASE_URL
          }/search/multi?api_key=${API_KEY}&language=vi-VN&query=${encodeURIComponent(
            searchQuery
          )}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Separate results by type
        const movies = [];
        const tv = [];
        const people = [];

        for (const item of data.results || []) {
          if (item.media_type === "movie") {
            const detailedMovie = await fetchDetailedInfo(item);
            movies.push(detailedMovie);
          } else if (item.media_type === "tv") {
            const detailedTv = await fetchDetailedInfo(item);
            tv.push(detailedTv);
          } else if (item.media_type === "person") {
            people.push(item);
          }
        }

        const searchResults = {
          movies,
          tv,
          people,
          total: data.total_results || 0,
          totalPages: data.total_pages || 0,
          currentPage: page,
        };

        setResults(searchResults);
        return searchResults;
      } catch (error) {
        console.error("Error searching:", error);
        const emptyResults = { movies: [], tv: [], people: [], total: 0 };
        setResults(emptyResults);
        return emptyResults;
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, fetchDetailedInfo]
  );

  const debouncedSearch = useCallback(
    (searchQuery) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        searchMulti(searchQuery);
      }, 300);
    },
    [searchMulti]
  );

  const handleInputChange = useCallback(
    (value) => {
      setQuery(value);
      if (value.trim()) {
        setShowDropdown(true);
        debouncedSearch(value);
      } else {
        setShowDropdown(false);
        setResults({ movies: [], tv: [], people: [], total: 0 });
      }
    },
    [debouncedSearch]
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults({ movies: [], tv: [], people: [], total: 0 });
    setShowDropdown(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  const hideDropdown = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const showSearchDropdown = useCallback(() => {
    if (
      query.trim() &&
      (results.movies.length > 0 ||
        results.tv.length > 0 ||
        results.people.length > 0)
    ) {
      setShowDropdown(true);
    }
  }, [query, results]);

  return {
    query,
    results,
    loading,
    showDropdown,
    handleInputChange,
    searchMulti,
    clearSearch,
    hideDropdown,
    showSearchDropdown,
  };
};

export default useSearch;
