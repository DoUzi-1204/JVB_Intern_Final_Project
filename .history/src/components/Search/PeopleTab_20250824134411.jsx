import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { API_CONFIG } from "../../utils/constants";

const PeopleTab = ({ actorsOnly, renderPagination }) => {
  if (!actorsOnly || actorsOnly.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-white mb-2">
          Không tìm thấy diễn viên nào
        </h3>
        <p className="text-gray-400">Thử tìm kiếm với từ khóa khác</p>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {actorsOnly.map((person) => (
          <Link
            key={`person-${person.id}`}
            to={`/actor/${person.id}`}
            className="rounded-lg overflow-hidden transition-colors duration-200 cursor-pointer"
            aria-label={`Xem chi tiết diễn viên ${person.name}`}
          >
            {/* Profile Image */}
            <div className="aspect-[3/4] bg-gray-700 rounded-sm overflow-hidden mx-auto ">
              {person.profile_path ? (
                <img
                  src={`${API_CONFIG.IMAGE_BASE_URL}/w300${person.profile_path}`}
                  alt={person.name}
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
                {person.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      {renderPagination()}
    </>
  );
};

export default PeopleTab;
