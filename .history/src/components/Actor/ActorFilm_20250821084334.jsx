import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCard";

const API_KEY = import.meta.env.VITE_API_KEY;

const ActorFilm = ({ actorId }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!actorId) return;
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}&language=vi-VN`)
      .then((res) => res.json())
      .then((data) => {
        // Chỉ lấy các phim (movie hoặc tv) có poster
        const filtered = (data.cast || []).filter(
          (item) => item.poster_path && (item.media_type === "movie" || item.media_type === "tv")
        );
        setFilms(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [actorId]);

  if (loading) return <div>Đang tải phim...</div>;
  if (error) return <div>Không thể tải phim của diễn viên.</div>;

  // Chia thành các dòng, mỗi dòng 5 phim
  const rows = [];
  for (let i = 0; i < films.length; i += 5) {
    rows.push(films.slice(i, i + 5));
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Các phim của diễn viên</h2>
      {rows.length === 0 ? (
        <div>Không có phim nào.</div>
      ) : (
        rows.map((row, idx) => (
          <div key={idx} className="flex gap-4 mb-6">
            {row.map((film) => (
              <div key={film.id} className="w-1/5 group relative">
                <ItemCard item={film} mediaType={film.media_type} layout="vertical" />
                {/* Hover preview card */}
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {/* Có thể render PreviewCard ở đây nếu muốn */}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ActorFilm;
