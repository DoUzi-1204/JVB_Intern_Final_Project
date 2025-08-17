import React, { useEffect, useState } from "react";
import { TrendingSkeleton } from "../Skeleton";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/trending/all/";

const Trending = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}${timeWindow}?api_key=${API_KEY}&language=vi-VN`
        );
        const data = await response.json();
        setItems(data.results.slice(0, 10));
      } catch {
        setItems([]);
      }
      setLoading(false);
    };
    fetchTrending();
  }, [timeWindow]);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Trending</h2>
      <div className="flex items-center mb-4 bg-gray-700 rounded-lg overflow-hidden w-full">
        <button
          onClick={() => setTimeWindow("day")}
          className={`flex-1 px-4 py-2 font-semibold transition-all focus:outline-none ${
            timeWindow === "day"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          Ngày
        </button>
        <div className="h-6 w-px bg-gray-400 mx-0" />
        <button
          onClick={() => setTimeWindow("week")}
          className={`flex-1 px-4 py-2 font-semibold transition-all focus:outline-none ${
            timeWindow === "week"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          Tuần
        </button>
      </div>
      {loading ? (
        <TrendingSkeleton />
      ) : (
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li
              key={item.id}
              className="flex items-center bg-gray-800 rounded-lg px-7 py-5"
            >
              {/* Poster phim */}
              <Link to={`/${item.media_type}/${item.id}`}>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : "https://via.placeholder.com/100x150?text=No+Image"
                  }
                  alt={item.title || item.name}
                  className="w-20 h-28 object-cover rounded shadow flex-shrink-0"
                />
              </Link>
              {/* Thông tin phim */}
              <div className="flex flex-col justify-center ml-4 w-full text-left">
                <Link to={`/${item.media_type}/${item.id}`}>
                  <div className="text-base font-semibold text-white leading-tight">
                    {item.media_type === "movie" ? item.title : item.name}
                  </div>
                </Link>
                <div className="text-gray-300 text-sm mb-2">
                  {item.media_type === "movie"
                    ? item.original_title
                    : item.original_name}
                </div>
                {/* Meta info: điểm TMDB, năm phát hành */}
                <div className="flex gap-2 items-center mt-1">
                  {item.vote_average > 0 && (
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800/80 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                      TMDB {item.vote_average.toFixed(1)}
                    </span>
                  )}
                  {(item.release_date || item.first_air_date) && (
                    <span className="bg-white/10 border border-white px-2 py-1 rounded text-xs font-normal">
                      {item.release_date
                        ? new Date(item.release_date).getFullYear()
                        : new Date(item.first_air_date).getFullYear()}
                    </span>
                  )}
                </div>
              </div>
              {/* Số thứ tự bên phải ngoài cùng */}
              <div className="w-14 flex items-center justify-center">
                <span
                  className="text-5xl font-bold text-transparent select-none"
                  style={{ WebkitTextStroke: "2px white" }}
                >
                  {idx + 1}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trending;
