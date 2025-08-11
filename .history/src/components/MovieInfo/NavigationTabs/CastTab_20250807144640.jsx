import React from 'react';

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
          <div 
            key={`${actor.id}-${index}`}
            className="cast-card bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 hover:scale-105"
          >
            {/* Actor Photo */}
            <div className="aspect-w-3 aspect-h-4 bg-gray-700">
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
                    <div className="text-xs">Không có ảnh</div>
                  </div>
                </div>
              )}
            </div>

            {/* Actor Info */}
            <div className="p-4">
              {/* Actor Name */}
              <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2 hover:text-yellow-400 transition-colors">
                {actor.name}
              </h4>

              {/* Character Name */}
              <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                {actor.character || 'Vai diễn không rõ'}
              </p>

              {/* Additional Info */}
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                {actor.order !== undefined && (
                  <span>#{actor.order + 1}</span>
                )}
                {actor.popularity && (
                  <span className="text-yellow-400">
                    ⭐ {actor.popularity.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show crew if available */}
      {credits.crew && credits.crew.length > 0 && (
        <div className="crew-section mt-12">
          <h3 className="text-xl font-bold text-yellow-400 mb-6">Đoàn phim</h3>
          
          {/* Group crew by department */}
          {(() => {
            const departments = {};
            credits.crew.forEach(member => {
              const dept = member.department || 'Khác';
              if (!departments[dept]) departments[dept] = [];
              departments[dept].push(member);
            });

            // Show only main departments
            const mainDepartments = ['Directing', 'Writing', 'Production', 'Camera', 'Sound'];
            
            return mainDepartments.map(dept => {
              const members = departments[dept];
              if (!members || members.length === 0) return null;

              const deptName = {
                'Directing': 'Đạo diễn',
                'Writing': 'Biên kịch',
                'Production': 'Sản xuất',
                'Camera': 'Quay phim',
                'Sound': 'Âm thanh'
              }[dept] || dept;

              return (
                <div key={dept} className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">{deptName}</h4>
                  <div className="grid grid-cols-5 gap-4">
                    {members.slice(0, 10).map((member, index) => (
                      <div 
                        key={`${member.id}-${index}`}
                        className="crew-card bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {member.profile_path ? (
                            <img
                              src={`${IMAGE_BASE_URL}/w92${member.profile_path}`}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                              <span className="text-gray-400 text-xs">👤</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-white text-sm font-medium truncate">{member.name}</h5>
                            <p className="text-gray-400 text-xs truncate">{member.job}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}
    </div>
  );
};

export default CastTab;
