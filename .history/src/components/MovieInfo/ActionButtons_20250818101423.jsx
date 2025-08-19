import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { TiMediaPlay } from "react-icons/ti";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";

const ActionButtons = ({ isMovie, movieId }) => {
  const handleFavorite = () => console.log("Thêm vào yêu thích");
  const handleAddToList = () => console.log("Thêm vào danh sách");
  const handleShare = () => console.log("Chia sẻ phim");
  const handleComment = () => console.log("Mở bình luận");
  const handleRating = () => console.log("Đánh giá phim");

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 w-full">
      {/* Nút Xem ngay (trên mobile nằm riêng ở trên) */}
      <Link
        to={`/${isMovie ? "movie" : "tv"}/${movieId}/watch`}
        className="bg-gradient-to-r from-yellow-500 to-yellow-100 backdrop-blur-sm 
        text-black px-4 py-2 sm:px-5 sm:py-3 rounded-full font-semibold 
        hover:from-yellow-400 hover:to-yellow-500 transition-colors 
        flex items-center space-x-1 w-fit"
      >
        <TiMediaPlay className="w-4 h-4 sm:w-6 sm:h-6" />
        <span className="text-base sm:text-lg">Xem ngay</span>
      </Link>

      {/* Nhóm nút chức năng */}
      <div className="flex flex-row flex-wrap md:flex-row items-center justify-center  gap-1 xl:gap-3 w-full md:w-auto">
        <button
          onClick={handleFavorite}
          className="flex flex-col items-center text-white px-4 py-3 rounded-lg 
          transition-colors duration-300 hover:text-yellow-400"
        >
          <IoMdHeart className="w-5 h-5 mb-1" />
          <span className="text-sm">Yêu thích</span>
        </button>

        <button
          onClick={handleAddToList}
          className="flex flex-col items-center text-white px-4 py-3 rounded-lg 
          transition-colors duration-300 hover:text-yellow-400"
        >
          <MdFormatListBulletedAdd className="w-5 h-5 mb-1" />
          <span className="text-sm">Thêm</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center text-white px-4 py-3 rounded-lg 
          transition-colors duration-300 hover:text-yellow-400"
        >
          <IoShareSocialOutline className="w-5 h-5 mb-1" />
          <span className="text-sm">Chia sẻ</span>
        </button>

        <button
          onClick={handleComment}
          className="flex flex-col items-center text-white px-4 py-3 rounded-lg 
          transition-colors duration-300 hover:text-yellow-400"
        >
          <IoChatboxEllipses className="w-5 h-5 mb-1" />
          <span className="text-sm">Bình luận</span>
        </button>

        {/* Nút Đánh giá */}
        <button
          onClick={handleRating}
          className="flex items-center gap-3 px-5 py-3 
          bg-gradient-to-r from-blue-800 to-cyan-600 rounded-full 
          hover:brightness-110 transition-all duration-300"
          title="Đánh giá phim"
        >
          <FaStar className="w-5 h-5 text-white" />
          <span className="text-white underline text-sm">Đánh giá</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
