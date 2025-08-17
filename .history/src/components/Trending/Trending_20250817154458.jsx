import React, { useEffect, useState } from "react";

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
            <li
              key={item.id}
              className="flex items-center bg-gray-800 rounded-lg p-3"
            >
              <span className="text-2xl font-bold text-blue-400 mr-4 w-8 text-center flex-shrink-0">{idx + 1}</span>
              <div className="flex items-center gap-4 w-full">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : "https://via.placeholder.com/100x150?text=No+Image"
                  }
                  alt={item.title || item.name}
                  className="w-16 h-24 object-cover rounded shadow flex-shrink-0"
                />
                <div className="flex flex-col justify-center w-full">
                  <div className="text-base font-semibold text-white leading-tight">
                    {item.media_type === "movie" ? item.title : item.name}
                  </div>
                  <div className="text-gray-300 text-sm mb-2">
                    {item.media_type === "movie" ? item.original_title : item.original_name}
                  </div>
                  <div className="flex gap-2 items-center">
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
              </div>
            </li>
                }
                alt={item.title || item.name}
                className="mx-8 w-24 h-36 object-cover rounded shadow"
              />
              <div className="flex-1">
                <div className="text-lg font-semibold text-white">
                  {item.media_type === "movie" ? item.title : item.name}
                </div>
                <div className="text-gray-300 text-sm">
                  {item.media_type === "movie"
                    ? item.original_title
                    : item.original_name}
                </div>
                <div className="flex gap-4 mt-2 text-gray-400 text-sm">
                  <span>
                    Điểm TMDB:{" "}
                    <span className="font-bold text-yellow-400">
                      {item.vote_average}
                    </span>
                  </span>
                  <span>
                    Năm:{" "}
                    {item.release_date
                      ? item.release_date.slice(0, 4)
                      : item.first_air_date
                      ? item.first_air_date.slice(0, 4)
                      : "?"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trending;
