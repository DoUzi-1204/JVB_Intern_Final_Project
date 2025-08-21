import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoPerson } from "react-icons/io5";
import { API_CONFIG } from "../../utils/constants";

const ActorGrid = ({ actors }) => {
  if (!actors || actors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-medium text-white mb-2">
          Không tìm thấy diễn viên nào
        </h3>
        <p className="text-gray-400">Thử tìm kiếm với từ khóa khác</p>
      </div>
    );
  }
  return (
    <div className="actor-grid-container">
      <h2 className="text-2xl text-white text-left font-medium mb-4 flex items-center">
        <IoPerson className="mr-2 text-3xl" />
        Diễn viên
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {actors.map((actor) => (
          <div
            key={`actor-${actor.id}`}
            className="rounded-lg overflow-hidden transition-colors duration-200 cursor-pointer"
            onClick={() =>
              window.open(
                `https://www.themoviedb.org/person/${actor.id}`,
                "_blank"
              )
            }
          >
            {/* Profile Image */}
            <div className="aspect-[3/4] bg-gray-700 rounded-sm overflow-hidden mx-auto">
              {actor.profile_path ? (
                <img
                  src={`${API_CONFIG.IMAGE_BASE_URL}/w300${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">
                  <CgProfile className="w-10 h-10 text-gray-500" />
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-4">
              <h3 className="text-white font-normal text-base truncate mb-1">
                {actor.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorGrid;
