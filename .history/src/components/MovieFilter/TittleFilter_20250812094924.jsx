import { BiFileFind } from "react-icons/bi";

const TittleFilter = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold text-white text-left flex items-center gap-2">
        <BiFileFind className="text-white" size={32} />
        Lọc Phim
      </h1>
    </div>
  );
};

export default TittleFilter;
