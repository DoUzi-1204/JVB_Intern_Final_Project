import { BiFileFind } from "react-icons/bi";

const TittleFilter = () => {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold text-white text-left flex items-center gap-2">
        <BiFileFind className="text-white" size={30} />
        Lọc Phim
      </h1>
    </div>
  );
};

export default TittleFilter;
