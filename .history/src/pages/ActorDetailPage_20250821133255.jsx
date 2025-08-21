import React from "react";
import { useParams } from "react-router-dom";
import useActor from "../hooks/useActor";
import ActorInfo from "../components/Actor/ActorInfo";
import ActorFilm from "../components/Actor/ActorFilm";

export default function ActorDetailPage() {
  const { id } = useParams();
  const { actor, credits, loading, error } = useActor({ personId: id });

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <ActorInfo actor={actor} loading={loading} error={error} />
      <ActorFilm credits={credits} loading={loading} error={error} />
    </div>
  );
}
