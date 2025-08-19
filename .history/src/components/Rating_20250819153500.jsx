import React, { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaTimes } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

const Rating = ({
  movieName = "Tên phim",
  currentRating = 0,
  ratingCount = 0,
  history = [],
  onClose,
  onSubmit,
  visible,
}) => {
  const [mode, setMode] = useState("rate"); // "rate" or "history"
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");

  // Xử lý chọn sao (0.5, 1, ..., 10)
  const handleStarClick = (value) => setStar(value);

  // Tạo mảng 5 ngôi sao (0.5, 2, 4, 6, 8, 10 điểm)
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i += 2) {
      if (star >= i) {
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-400 cursor-pointer"
            onClick={() => handleStarClick(i)}
          />
        );
      } else if (star === i - 1) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="text-yellow-400 cursor-pointer"
            onClick={() => handleStarClick(i)}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="text-gray-400 cursor-pointer"
            onClick={() => handleStarClick(i - 1)}
            onDoubleClick={() => handleStarClick(i)}
          />
        );
      }
    }
    return stars;
  };

  // Dữ liệu biểu đồ lịch sử
  const chartData = {
    labels: Array.from({ length: 11 }, (_, i) => i), // 0-10
    datasets: [
      {
        label: "Số lượng đánh giá",
        data: history, // [số lượng đánh giá cho từng điểm]
        fill: false,
        borderColor: "#facc15",
        tension: 0.1,
      },
    ],
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md relative p-6">
        {/* Đóng */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        {/* Tên phim */}
        <div className="text-center mb-2">
          <h2 className="text-lg font-bold text-white">{movieName}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <FaStar className="text-yellow-400" />
            <span className="text-yellow-400 font-semibold">{currentRating || 0}</span>
            <span className="text-gray-400 text-sm">/ {ratingCount || 0} lượt đánh giá</span>
          </div>
        </div>
        {/* Chế độ */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${mode === "rate" ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
            onClick={() => setMode("rate")}
          >
            Đánh giá
          </button>
          <button
            className={`px-3 py-1 rounded ${mode === "history" ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
            onClick={() => setMode("history")}
          >
            Lịch sử đánh giá
          </button>
        </div>
        {/* Nội dung */}
        {mode === "rate" ? (
          <div>
            <div className="flex justify-center gap-1 mb-2">{renderStars()}</div>
            <div className="text-center text-yellow-400 font-bold mb-2">{star}</div>
            <textarea
              className="w-full p-2 rounded bg-gray-800 text-white mb-3"
              rows={3}
              placeholder="Nhận xét của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="w-full py-2 rounded bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
              onClick={() => onSubmit && onSubmit({ star, comment })}
              disabled={star === 0}
            >
              Gửi đánh giá
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 p-3 rounded">
            <Line data={chartData} options={{
              scales: {
                x: { title: { display: true, text: "Điểm đánh giá" } },
                y: { title: { display: true, text: "Số lượng" }, beginAtZero: true }
              }
            }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;