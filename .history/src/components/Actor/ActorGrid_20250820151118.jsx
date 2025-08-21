import React from "react";

const ActorGrid = ({ actors }) => {
  return (
    <div className="actor-grid-container">
      <h2 className="text-2xl font-bold mb-4">Diễn viên</h2>
      <div className="grid grid-cols-6 gap-4">
        {actors.map((actor) => (
          <div key={actor.id} className="flex flex-col items-center">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "/public/logo.png"
              }
              alt={actor.name}
              className="rounded-full w-24 h-24 object-cover mb-2"
            />
            <span className="text-center font-medium">{actor.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorGrid;
