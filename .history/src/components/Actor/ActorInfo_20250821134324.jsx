import React from "react";

const genderMap = {
  1: "Nữ",
  2: "Nam",
  0: "Không rõ",
};

export default function ActorInfo({ actor, loading }) {
  if (loading) {
    return (
      <div className="w-1/4 p-6 flex flex-col items-center bg-gray-900 rounded-lg shadow-lg animate-pulse">
        <div className="w-40 h-40 rounded-full bg-gray-700 mb-4" />
        <div className="h-6 w-32 bg-gray-700 rounded mb-2" />
        <div className="h-4 w-24 bg-gray-700 rounded mb-1" />
        <div className="h-4 w-24 bg-gray-700 rounded mb-1" />
        <div className="mt-4 w-full">
          <div className="h-4 w-20 bg-yellow-700 rounded mb-2" />
          <div className="h-16 w-full bg-gray-700 rounded" />
        </div>
      </div>
    );
  }
  if (!actor) return null;
  return (
    <div className="w-1/4 p-6 flex flex-col items-center bg-gray-900 rounded-lg shadow-lg">
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
            : "/logo.png"
        }
        alt={actor.name}
        className="w-40 h-40 object-cover rounded-full mb-4 border-4 border-yellow-400"
      />
      <h2 className="text-xl font-bold text-white mb-2 text-center">
        {actor.name}
      </h2>
      <p className="text-gray-300 mb-1">
        Giới tính:{" "}
        <span className="font-semibold">{genderMap[actor.gender]}</span>
      </p>
      <p className="text-gray-300 mb-1">
        Ngày sinh:{" "}
        <span className="font-semibold">{actor.birthday || "Không rõ"}</span>
      </p>
      <div className="mt-4 text-gray-400 text-sm max-h-40 overflow-y-auto">
        <span className="font-semibold text-yellow-400">Tiểu sử:</span>
        <p className="mt-1 whitespace-pre-line">
          {actor.biography || "Không có thông tin."}
        </p>
      </div>
    </div>
  );
}
