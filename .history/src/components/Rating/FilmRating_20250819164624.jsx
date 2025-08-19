import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const MAX_STARS = 5;

const FilmRating = () => {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");

  // Xử lý click vào sao
  const handleStarClick = (index, isHalf) => {
    setScore(isHalf ? index * 2 - 1 : index * 2);
  };

  return (
    <div>
      {/* Stars */}
      <div className="flex items-center gap-2 mb-2">
        {[...Array(MAX_STARS)].map((_, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Nửa sao trái */}
            <span
              className="cursor-pointer"
              onClick={() => handleStarClick(i + 1, true)}
            >
              <AiFillStar
                className={score >= i * 2 + 1 ? "text-yellow-400" : "text-gray-300"}
                style={{ clipPath: "inset(0 50% 0 0)" }}
                size={28}
              />
            </span>
            {/* Nửa sao phải */}
            <span
              className="cursor-pointer -ml-7"
              onClick={() => handleStarClick(i + 1, false)}
            >
              <AiFillStar
                className={score >= (i + 1) * 2 ? "text-yellow-400" : "text-gray-300"}
                style={{ clipPath: "inset(0 0 0 50%)" }}
                size={28}
              />
            </span>
          </div>
        ))}
        <span className="ml-2 font-bold text-lg">{score}</span>
      </div>

      {/* Comment Box */}
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows={3}
        placeholder="Nhập nhận xét của bạn..."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      {/* Submit Button */}
      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Gửi đánh giá
      </button>
    </div>
  );
};

export default FilmRating;
