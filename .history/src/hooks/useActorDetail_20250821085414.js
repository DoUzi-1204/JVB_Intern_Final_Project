import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.themoviedb.org/3/person";

export default function useActorDetail(personId) {
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!personId) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/${personId}?api_key=${API_KEY}&language=vi-VN`).then((res) => res.json()),
      fetch(`${API_URL}/${personId}/combined_credits?api_key=${API_KEY}&language=vi-VN`).then((res) => res.json()),
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
  }, [personId]);

  return { actor, credits, loading, error };
}
