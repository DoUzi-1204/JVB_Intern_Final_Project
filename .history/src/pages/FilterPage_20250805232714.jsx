import { useState, useEffect } from "react";

const FilterPage = () => {
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    country: "",
    rating: "",
    sortBy: "popularity.desc",
  });

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  // Danh sách năm
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  // Danh sách quốc gia
  const countries = [
    { code: "US", name: "Hoa Kỳ" },
    { code: "KR", name: "Hàn Quốc" },
    { code: "JP", name: "Nhật Bản" },
    { code: "CN", name: "Trung Quốc" },
    { code: "VN", name: "Việt Nam" },
    { code: "TH", name: "Thái Lan" },
    { code: "IN", name: "Ấn Độ" },
    { code: "GB", name: "Anh" },
    { code: "FR", name: "Pháp" },
  ];

  // Danh sách sắp xếp
  const sortOptions = [
    { value: "popularity.desc", label: "Phổ biến nhất" },
    { value: "release_date.desc", label: "Mới nhất" },
    { value: "vote_average.desc", label: "Đánh giá cao nhất" },
    { value: "revenue.desc", label: "Doanh thu cao nhất" },
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=vi-VN`
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    if (API_KEY) {
      fetchGenres();
    }
  }, [API_KEY]);

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Search movies with filters
  const searchMovies = async () => {
    setLoading(true);
    try {
      let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=vi-VN&sort_by=${filters.sortBy}`;

      if (filters.genre) url += `&with_genres=${filters.genre}`;
      if (filters.year) url += `&year=${filters.year}`;
      if (filters.country) url += `&with_origin_country=${filters.country}`;
      if (filters.rating) url += `&vote_average.gte=${filters.rating}`;

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      genre: "",
      year: "",
      country: "",
      rating: "",
      sortBy: "popularity.desc",
    });
    setMovies([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Lọc Phim
        </h1>

        {/* Filter Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Genre Filter */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Thể loại
              </label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange("genre", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
              >
                <option value="">Tất cả thể loại</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Năm
              </label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
              >
                <option value="">Tất cả năm</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Quốc gia
              </label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
              >
                <option value="">Tất cả quốc gia</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Đánh giá tối thiểu
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
              >
                <option value="">Tất cả</option>
                <option value="7">7+ sao</option>
                <option value="8">8+ sao</option>
                <option value="9">9+ sao</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Sắp xếp theo
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={searchMovies}
              className="px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors duration-300"
            >
              Tìm kiếm
            </button>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
            <p className="text-white mt-4">Đang tìm kiếm...</p>
          </div>
        )}

        {movies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-white text-sm font-medium line-clamp-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="text-white text-xs ml-1">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {movies.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Chọn bộ lọc và nhấn "Tìm kiếm" để xem kết quả
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
