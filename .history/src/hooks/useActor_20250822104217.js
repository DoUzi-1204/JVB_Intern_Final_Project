import { useEffect, useState } from "react";

// const API_KEY = import.meta.env.VITE_API_KEY;
// const API_URL = "https://api.themoviedb.org/3/person";

export default function useActor({ page = 1, personId = null } = {}) {
  // Danh sách diễn viên phổ biến
  const [actors, setActors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Chi tiết diễn viên và phim liên quan
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState([]);

  // Loading và error chung
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (personId) {
      // Lấy chi tiết diễn viên và phim liên quan
      setLoading(true);
      Promise.all([
  fetch(`/api/actor/${personId}?language=vi-VN`).then(
          (res) => res.json()
        ),
        fetch(
          `/api/actor/${personId}/combined_credits?language=vi-VN`
        ).then((res) => res.json()),
      ])
        .then(([actorData, creditsData]) => {
          setActor(actorData);
          setCredits(creditsData.cast || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      // Lấy danh sách diễn viên phổ biến
      setLoading(true);
  fetch(`/api/actor/popular?page=${page}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const filtered =
            data.results?.filter(
              (person) => person.known_for_department === "Acting"
            ) || [];
          setActors(filtered);
          setTotalPages(data.total_pages || 1);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [page, personId]);

  return { actors, totalPages, actor, credits, loading, error };
}
