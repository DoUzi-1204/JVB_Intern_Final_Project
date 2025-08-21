import React, { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { CgArrowRight } from "react-icons/cg";
import { IoCloseCircle } from "react-icons/io5";
import { Line } from "react-chartjs-2";
// Plugin đổi màu nền vùng đồ thị cho Chart.js 4.x
const chartAreaBg = {
  id: "custom_canvas_background_color",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgba(128,128,128,0.3)"; // màu nền bạn muốn
    ctx.fillRect(
      chart.chartArea.left,
      chart.chartArea.top,
      chart.chartArea.right - chart.chartArea.left,
      chart.chartArea.bottom - chart.chartArea.top
    );
    ctx.restore();
  },
};
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Rating = ({ title = "Tên phim mẫu", onClose }) => {
  const [mode, setMode] = useState("rate"); // 'rate' or 'history'
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(null);
  const [comment, setComment] = useState("");

  // UI chart data mẫu
  const chartData = {
    labels: Array.from({ length: 11 }, (_, i) => i),
    datasets: [
      {
        label: "Số lượng đánh giá",
        data: Array(11).fill(0),
        borderColor: "#fbbf24",
        backgroundColor: "rgba(251,191,36,0.2)",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 0, // không vẽ line khi toàn 0
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Điểm",
          color: "#fff",
          font: {
            size: 18,
            weight: "bold",
          },
        },
        ticks: {
          color: "#fff",
          font: {
            size: 14,
            weight: "medium",
          },
        },
        grid: {
          drawBorder: true,
          borderColor: "#fff",
          borderWidth: 2,
          drawTicks: true,
          tickLength: 6,
          color: "transparent",
          tickColor: "#fff",
        },
      },
      y: {
        title: {
          display: true,
          text: "Lượt đánh giá",
          color: "#fff",
          font: {
            size: 18, // tăng cỡ chữ
            weight: "bold", // độ đậm
          },
        },
        beginAtZero: true,
        ticks: {
          display: false,
          color: "#fff",
          font: {
            size: 14,
          },
        },
        grid: {
          drawBorder: true,
          borderColor: "#fff",
          borderWidth: 2,
          drawTicks: false,
          color: "transparent",
          tickColor: "#fff",
        },
      },
    },
  };

  // Xử lý chọn sao (0.5, 1, 1.5, ... 5)
  const handleStarClick = (value) => setStar(value);
  const handleStarHover = (value) => setHoverStar(value);
  const handleStarLeave = () => setHoverStar(null);

  // Modal overlay
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-75">
      <div className="relative bg-gray-700 rounded-lg shadow-lg w-full max-w-[600px] px-6 pb-6 pt-11 animate-fadeIn min-h-[470px]">
        {/* Icon đóng góc trên phải */}
        <button
          className="absolute top-3 right-3 text-gray-200 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          <IoCloseCircle />
        </button>

        {/* Tên phim & điểm đánh giá */}
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-2xl font-medium mb-2 text-center">{title}</h2>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400 text-lg" />
            <span className="font-semibold text-yellow-600">0</span>
            <span className="text-gray-500">/ 0 lượt đánh giá</span>
          </div>
        </div>

        {/* Nhóm nút chuyển chế độ kiểu toggle với màu nền giống Trending.jsx */}
        <div className="flex justify-center mb-6">
          <div className="flex w-full border border-gray-200 rounded-md overflow-hidden bg-transparent">
            <button
              className={`w-1/2 py-2 font-semibold transition-colors focus:z-10 text-sm sm:text-base ${
                mode === "rate"
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-gray-500"
              }`}
              style={{ borderRight: "1px solid #fff " }}
              onClick={() => setMode("rate")}
            >
              Đánh giá
            </button>
            <button
              className={`w-1/2  py-2 font-semibold transition-colors focus:z-10 text-sm sm:text-base ${
                mode === "history"
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-gray-500"
              }`}
              onClick={() => setMode("history")}
            >
              Biểu đồ đánh giá
            </button>
          </div>
        </div>

        {/* Chế độ đánh giá */}
        {mode === "rate" && (
          <div className="flex flex-col items-center gap-4">
            {/* 5 ngôi sao */}
            <div className="flex gap-2 mb-2">
              {Array.from({ length: 5 }, (_, i) => {
                const value = (i + 1) * 1;
                const halfValue = value - 0.5;
                const displayValue = hoverStar !== null ? hoverStar : star;
                return (
                  <span key={i} className="relative flex flex-col items-center">
                    <span
                      className="cursor-pointer"
                      onMouseEnter={() => handleStarHover(halfValue)}
                      onMouseLeave={handleStarLeave}
                      onClick={() => handleStarClick(halfValue)}
                    >
                      {displayValue >= halfValue ? (
                        displayValue < value ? (
                          <FaStarHalfAlt className="text-yellow-400 text-2xl" />
                        ) : (
                          <FaStar className="text-yellow-400 text-2xl" />
                        )
                      ) : (
                        <FaRegStar className="text-gray-300 text-2xl" />
                      )}
                    </span>
                    <span
                      className="cursor-pointer"
                      onMouseEnter={() => handleStarHover(value)}
                      onMouseLeave={handleStarLeave}
                      onClick={() => handleStarClick(value)}
                      style={{
                        position: "absolute",
                        left: "1.2em",
                        top: 0,
                        width: "1em",
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
            <div className="text-lg font-bold text-yellow-600">{star}</div>
            {/* Box nhận xét */}
            <textarea
              className="w-full bg-transparent border rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-gray-500"
              rows={3}
              placeholder="Nhập nhận xét của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {/* Nút gửi đánh giá */}
            <div className="flex gap-2 w-full">
              {/* Nút gửi */}
              <button
                className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-200 text-black font-normal py-2 rounded-full hover:brightness-110 transition-all flex items-center justify-center gap-2"
                onClick={() => {}}
              >
                Gửi đánh giá
                <CgArrowRight className="text-black text-2xl" />
              </button>

              {/* Nút xóa */}
              <button
                className="flex-1 bg-gradient-to-r from-red-600 to-red-300 text-black font-normal py-2 rounded-full hover:brightness-110 transition-all"
                onClick={() => {
                  setStar(0);
                  setComment("");
                }}
              >
                Xóa đánh giá
              </button>
            </div>
          </div>
        )}

        {/* Chế độ lịch sử đánh giá */}
        {mode === "history" && (
          <div className="w-full h-64 flex items-center justify-center">
            <Line
              data={chartData}
              options={chartOptions}
              plugins={[chartAreaBg]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
