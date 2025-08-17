import { BiFileFind } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { parseFiltersFromURL } from "../../utils/filterUtils";

const TittleFilter = () => {
  const location = useLocation();
  const filters = parseFiltersFromURL(location.search);
  
  // Tạo mô tả ngắn về filter hiện tại
  const getFilterDescription = () => {
    const descriptions = [];
    
    if (filters.contentType) {
      descriptions.push(filters.contentType === 'movie' ? 'Phim lẻ' : 'Phim bộ');
    }
    
    if (filters.genres.length > 0) {
      descriptions.push(`${filters.genres.length} thể loại`);
    }
    
    if (filters.selectedYear) {
      descriptions.push(`Năm ${filters.selectedYear}`);
    }
    
    if (filters.countries.length > 0) {
      descriptions.push(`${filters.countries.length} quốc gia`);
    }
    
    return descriptions.length > 0 ? ` - ${descriptions.join(', ')}` : '';
  };

  return (
    <div className="mb-3">
      <h1 className="text-2xl font-semibold text-white text-left flex items-center gap-2">
        <BiFileFind className="text-white" size={30} />
        Lọc Phim{getFilterDescription()}
      </h1>
    </div>
  );
};

export default TittleFilter;
