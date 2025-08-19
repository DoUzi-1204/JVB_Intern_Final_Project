import { useState } from "react";
import { AiOutlineClose, AiFillStar } from "react-icons/ai";
import FilmRating from "./FilmRating";
import RatingChart from "./RatingChart";

const RatingSection = ({ movieName = "Tên phim", rating = 0, ratingCount = 0, onClose }) => {
  const [mode, setMode] = useState("rate"); // "rate" or "history"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-6">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Movie Name & Rating */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{movieName}</h2>
          <div className="flex items-center gap-2">
            <AiFillStar className="text-yellow-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500">/ {ratingCount} lượt</span>
          </div>
        </div>

        {/* Mode Switch */}
        <div className="flex gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded ${mode === "rate" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setMode("rate")}
          >
            Đánh giá
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === "history" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setMode("history")}
          >
            Lịch sử đánh giá
          </button>
        </div>

        {/* Content */}
        {mode === "rate" ? <FilmRating /> : <RatingChart />}
      </div>
    </div>
  );
};

export default RatingSection;
