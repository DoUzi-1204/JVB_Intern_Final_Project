import React, { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { Line } from "react-chartjs-2";
// Plugin đổi màu nền vùng đồ thị cho Chart.js 4.x
const chartAreaBg = {
  id: "custom_canvas_background_color",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
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
          color: "#fff"
        },
        ticks: {
          color: "#fff",
          font: {
            size: 14,
            weight: "medium"
          }
        },
        grid: {
          drawBorder: true,
          borderColor: "#fff",
          borderWidth: 2,
          drawTicks: true,
          tickLength: 6,
          color: "transparent",
          tickColor: "#fff"
        }
      },
      y: {
        title: {
          display: true,
          text: "Lượt đánh giá",
          color: "#fff"
        },
        beginAtZero: true,
        ticks: {
          display: false,
          color: "#fff",
          font: {
            size: 14
          }
        },
        grid: {
          drawBorder: true,
          borderColor: "#fff",
          borderWidth: 2,
          drawTicks: false,
          color: "transparent",
          tickColor: "#fff"
        }
      }
    }
      const ctx = chart.ctx;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = '#222'; // màu nền vùng biểu đồ
      ctx.fillRect(
        chart.chartArea.left,
        chart.chartArea.top,
        chart.chartArea.right - chart.chartArea.left,
        chart.chartArea.bottom - chart.chartArea.top
      );
      ctx.restore();
    }
  };
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Điểm", color: "#fff" },
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
          scales: {
            x: {
              title: { display: true, text: "Điểm", color: "#fff" },
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
              title: { display: true, text: "Lượt đánh giá", color: "#fff" },
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
              <button
                className="flex-1 bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                onClick={() => {}}
              >
                Gửi đánh giá
              </button>
              <button
                className="flex-1 bg-red-400 text-white font-semibold py-2 rounded-lg hover:bg-red-500 transition-colors"
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
