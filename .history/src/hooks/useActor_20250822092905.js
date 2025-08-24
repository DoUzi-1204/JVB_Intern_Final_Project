import { useEffect, useState } from "react";

const API_URL = "/api/person";

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
        fetch(`${API_URL}/${personId}?language=vi-VN`).then(
          (res) => res.json()
        ),
        fetch(
          `${API_URL}/${personId}/combined_credits?language=vi-VN`
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
      fetch(`${API_URL}/popular?language=vi-VN&page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          setActors(data.results || []);
          setTotalPages(data.total_pages || 1);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [personId, page]);

  return {
    actors,
    totalPages,
    actor,
    credits,
    loading,
    error,
  };
}
