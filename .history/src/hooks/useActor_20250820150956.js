import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/person/popular";
const API_KEY = "VITE_API_KEY"; // Thay bằng API key thật

export default function useActor(page = 1) {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}?api_key=${API_KEY}&page=${page}`)
      .then((res) => {
        // Chỉ lấy diễn viên
        const filtered = res.data.results.filter(
          (person) => person.known_for_department === "Acting"
        );
        setActors(filtered);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [page]);

  return { actors, loading, error, totalPages };
}
