import React from "react";
import ActorInfo from "../components/Actor/ActorInfo";
import ActorFilm from "../components/Actor/ActorFilm";
import { useParams } from "react-router-dom";
import "../App.css";

const ActorDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Left: Actor Info */}
      <div className="w-1/4 p-6">
        <ActorInfo actorId={id} />
      </div>
      {/* Right: Actor Films */}
      <div className="w-3/4 p-6">
        <ActorFilm actorId={id} />
      </div>
    </div>
  );
};

export default ActorDetailPage;
