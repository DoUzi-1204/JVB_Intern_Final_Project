import { useParams, useEffect, useState } from "react";
import TittleFilter from "../components/MovieFilter/TittleFilter";
import FilterPanel from "../components/MovieFilter/FilterPanel/FilterPanel";
import MovieGrid from "../components/MovieFilter/MovieGrid";
import Pagination from "../components/MovieFilter/Pagination";
import useMovieFilter from "../hooks/useMovieFilter";
import { API_CONFIG, POPULAR_MOVIE_COUNTRIES } from "../utils/constants";

const FilterPage = () => {
  const params = useParams();
  const [pageTitle, setPageTitle] = useState("Lọc Phim");
  const API_KEY = import.meta.env.VITE_API_KEY;

  const {
    filters,
    movies,
    loading,
    currentPage,
    totalPages,
    applyFilters,
    clearFilters,
    handlePageChange,
  } = useMovieFilter();

  // Set initial filters and title based on URL params
  useEffect(() => {
    const fetchGenreName = async (genreId) => {
      try {
        const [movieGenresRes, tvGenresRes] = await Promise.all([
          fetch(`${API_CONFIG.BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=vi-VN`),
          fetch(`${API_CONFIG.BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=vi-VN`)
        ]);
        
        const movieGenres = await movieGenresRes.json();
        const tvGenres = await tvGenresRes.json();
        
        const allGenres = [...(movieGenres.genres || []), ...(tvGenres.genres || [])];
        const genre = allGenres.find(g => g.id === parseInt(genreId));
        
        return genre ? genre.name : "Thể loại";
      } catch (error) {
        console.error("Error fetching genre:", error);
        return "Thể loại";
      }
    };

    const setupPageData = async () => {
      if (params.genreId) {
        // Genre filter
        const genreName = await fetchGenreName(params.genreId);
        setPageTitle(`Phim ${genreName}`);
        applyFilters({
          contentType: null,
          genres: [parseInt(params.genreId)],
          countries: [],
          selectedYear: null,
          ageRatings: [],
          sortBy: "popularity.desc",
        });
      } else if (params.countryCode) {
        // Country filter
        const country = POPULAR_MOVIE_COUNTRIES.find(c => c.iso_3166_1 === params.countryCode);
        const countryName = country ? country.name : "Quốc gia";
        setPageTitle(`Phim ${countryName}`);
        applyFilters({
          contentType: null,
          genres: [],
          countries: [params.countryCode],
          selectedYear: null,
          ageRatings: [],
          sortBy: "popularity.desc",
        });
      } else if (window.location.pathname === "/filter/movies") {
        // Movies filter
        setPageTitle("Phim Lẻ");
        applyFilters({
          contentType: "movie",
          genres: [],
          countries: [],
          selectedYear: null,
          ageRatings: [],
          sortBy: "popularity.desc",
        });
      } else if (window.location.pathname === "/filter/tv") {
        // TV series filter
        setPageTitle("Phim Bộ");
        applyFilters({
          contentType: "tv",
          genres: [],
          countries: [],
          selectedYear: null,
          ageRatings: [],
          sortBy: "popularity.desc",
        });
      } else {
        // Default filter page
        setPageTitle("Lọc Phim");
      }
    };

    setupPageData();
  }, [params, API_KEY, applyFilters]);

  const handleFiltersChange = (newFilters) => {
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-6 space-y-5">
        {/* 1. Title Filter */}
        <TittleFilter title={pageTitle} />

        {/* 2. Filter Panel */}
        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {/* 3. Movie Grid */}
        <MovieGrid movies={movies} loading={loading} />

        {/* 4. Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FilterPage;
