import { useState, useCallback, useRef } from "react";
import { API_CONFIG } from "../utils/constants";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    movies: [],
    tv: [],
    people: [],
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Fetch movie/TV details to get Vietnamese title and runtime
  const fetchDetailedInfo = useCallback(async (item) => {
    try {
      const endpoint = item.media_type === "movie" ? "movie" : "tv";
      
      // Fetch Vietnamese info
      const viResponse = await fetch(
        `${API_CONFIG.BASE_URL}/${endpoint}/${item.id}?api_key=${API_KEY}&language=vi-VN`
      );
      const viData = await viResponse.json();

      // Fetch English info  
      const enResponse = await fetch(
        `${API_CONFIG.BASE_URL}/${endpoint}/${item.id}?api_key=${API_KEY}&language=en-US`
      );
      const enData = await enResponse.json();

      return {
        ...item,
        title_vi: viData.title || viData.name || item.title || item.name,
        title_en: enData.title || enData.name || item.title || item.name,
        runtime: enData.runtime,
        number_of_seasons: enData.number_of_seasons,
        number_of_episodes: enData.number_of_episodes
      };
    } catch (error) {
      console.error("Error fetching detailed info:", error);
      return {
        ...item,
        title_vi: item.title || item.name,
        title_en: item.title || item.name
      };
    }
  }, [API_KEY]);

  const searchMulti = useCallback(async (searchQuery, page = 1) => {
    if (!searchQuery.trim() || !API_KEY) {
      setResults({ movies: [], tv: [], people: [], total: 0 });
      return { movies: [], tv: [], people: [], total: 0 };
    }

    setLoading(true);
    
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/search/multi?api_key=${API_KEY}&language=vi-VN&query=${encodeURIComponent(searchQuery)}&page=${page}`
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
        currentPage: page
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
  }, [API_KEY, fetchDetailedInfo]);

  const debouncedSearch = useCallback((searchQuery) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchMulti(searchQuery);
    }, 300);
  }, [searchMulti]);

  const handleInputChange = useCallback((value) => {
    setQuery(value);
    if (value.trim()) {
      setShowDropdown(true);
      debouncedSearch(value);
    } else {
      setShowDropdown(false);
      setResults({ movies: [], tv: [], people: [], total: 0 });
    }
  }, [debouncedSearch]);

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
    if (query.trim() && (results.movies.length > 0 || results.tv.length > 0 || results.people.length > 0)) {
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
    showSearchDropdown
  };
};

export default useSearch;
