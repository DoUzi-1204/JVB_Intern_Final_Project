import React from "react";

const genderMap = {
  1: "Nữ",
  2: "Nam",
  0: "Không rõ",
};

export default function ActorInfo({ actor, loading }) {
  if (loading) {
    return (
      <div className="w-full max-w-xs mx-auto p-6 flex flex-col bg-gray-900 rounded-2xl shadow-lg animate-pulse">
        <div className="w-40 h-40 rounded-full bg-gray-700 mb-4 self-center" />
        <div className="h-8 w-40 bg-gray-700 rounded mb-4" />
        <div className="h-5 w-32 bg-gray-700 rounded mb-3" />
        <div className="h-5 w-32 bg-gray-700 rounded mb-3" />
        <div className="h-5 w-32 bg-gray-700 rounded mb-3" />
        <div className="h-16 w-full bg-gray-700 rounded mt-4" />
      </div>
    );
  }
  if (!actor) return null;
  return (
    <div className="w-full max-w-xs p-0 flex flex-col bg-transparent lg:border-r lg:border-gray-800 items-center lg:items-start text-center lg:text-left">
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
            : "/logo.png"
        }
        alt={actor.name}
        className="w-40 h-52 object-cover rounded-3xl mb-2 border"
      />
      <h2 className="text-2xl font-medium text-white mb-4 w-full">
        {actor.name}
      </h2>
      <div className="flex flex-col gap-2 w-full">
        <div className="text-sm text-white">
          <span className="font-semibold w-20 inline-block">Giới thiệu:</span>
          <span className="inline-block">{actor.biography ? actor.biography : "Đang cập nhật"}</span>
        </div>
        <div className="text-sm text-white">
          <span className="font-semibold w-20 inline-block">Giới tính:</span>
          <span className="inline-block">{genderMap[actor.gender]}</span>
        </div>
        <div className="text-sm text-white">
          <span className="font-semibold w-20 inline-block">Ngày sinh:</span>
          <span className="inline-block">{actor.birthday ? actor.birthday : "Đang cập nhật"}</span>
        </div>
      </div>
    </div>
  );
}
