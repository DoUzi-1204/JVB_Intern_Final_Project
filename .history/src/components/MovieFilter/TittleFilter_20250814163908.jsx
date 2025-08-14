import { BiFileFind } from "react-icons/bi";

const TittleFilter = ({ title = "Lọc Phim" }) => {
  return (
    <div className="mb-3">
      <h1 className="text-2xl font-semibold text-white text-left flex items-center gap-2">
        <BiFileFind className="text-white" size={30} />
        {title}
      </h1>
    </div>
  );
};

export default TittleFilter;
