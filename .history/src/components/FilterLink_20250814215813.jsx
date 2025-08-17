import { Link } from 'react-router-dom';
import { createFilterURL } from '../utils/filterUtils';

// Component để tạo link với filter parameters
const FilterLink = ({ filters, page = 1, children, className, ...props }) => {
  const to = createFilterURL(filters, page);
  
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
};

export default FilterLink;
