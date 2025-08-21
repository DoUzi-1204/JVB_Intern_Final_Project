import { useEffect, useState } from "react";

const API_URL = "https://api.themoviedb.org/3/person/popular";
const API_KEY = "VITE_API_KEY"; // Thay bằng API key thật

export default function useActor(page = 1) {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}?api_key=${API_KEY}&page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Chỉ lấy diễn viên
        const filtered = data.results.filter(
          (person) => person.known_for_department === "Acting"
        );
        setActors(filtered);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [page]);

  return { actors, loading, error, totalPages };
}
