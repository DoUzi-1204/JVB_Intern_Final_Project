import React from "react";

const CastTab = ({ credits }) => {
  if (!credits || !credits.cast || credits.cast.length === 0) {
    return (
      <div className="cast-tab-container">
        <h3 className="text-xl font-bold text-yellow-400 mb-6">Diễn Viên</h3>
        <p className="text-gray-400">Chưa có thông tin diễn viên.</p>
      </div>
    );
  }

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  return (
    <div className="cast-tab-container">
      <h3 className="text-xl font-bold text-yellow-400 mb-6">Diễn Viên</h3>

      <div className="cast-grid grid grid-cols-5 gap-6">
        {credits.cast.map((actor, index) => (
          <div key={`${actor.id}-${index}`} className="cast-item">
            {/* Actor Photo */}
            <div className="actor-photo bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 mb-3">
              {actor.profile_path ? (
                <img
                  src={`${IMAGE_BASE_URL}/w342${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-4xl mb-2">👤</div>
                  </div>
                </div>
              )}
            </div>

            {/* Actor Info - Separated from photo */}
            <div className="actor-info text-left">
              {/* Actor Name */}
              <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2 hover:text-yellow-400 transition-colors">
                {actor.name}
              </h4>

              {/* Character Name */}
              <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                {actor.character || "Vai diễn không rõ"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastTab;
