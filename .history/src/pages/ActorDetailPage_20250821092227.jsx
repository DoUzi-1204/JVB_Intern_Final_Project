import React from "react";
import { useParams } from "react-router-dom";
import useActor from "../hooks/useActor";
import ActorInfo from "../components/Actor/ActorInfo";
import ActorFilm from "../components/Actor/ActorFilm";

  const { id } = useParams();
  const { actor, credits, loading, error } = useActor({ personId: id });

  if (loading) return <div className="text-center text-white">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500">Lỗi tải dữ liệu.</div>;
  if (!actor)
    return (
      <div className="text-center text-gray-400">Không tìm thấy diễn viên.</div>
    );

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <ActorInfo actor={actor} />
      <ActorFilm credits={credits} />
    </div>
  );
}
