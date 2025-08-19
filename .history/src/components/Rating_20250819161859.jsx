
import React, { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaTimes } from "react-icons/fa";
import { Line } from "react-chartjs-2";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Rating = ({ title = "Tên phim mẫu", score = 0, count = 0, onClose }) => {
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
				data: [2, 1, 3, 5, 8, 10, 7, 4, 2, 1, 0],
				borderColor: "#fbbf24",
				backgroundColor: "rgba(251,191,36,0.2)",
				tension: 0.4,
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
			x: { title: { display: true, text: "Điểm" } },
			y: { title: { display: true, text: "Số lượng" }, beginAtZero: true },
		},
	};

	// Xử lý chọn sao (0.5, 1, 1.5, ... 5)
	const handleStarClick = (value) => setStar(value);
	const handleStarHover = (value) => setHoverStar(value);
	const handleStarLeave = () => setHoverStar(null);

	// Modal overlay
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fadeIn">
				{/* Icon đóng góc trên phải */}
				<button
					className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
					onClick={onClose}
				>
					<FaTimes />
				</button>

				{/* Tên phim & điểm đánh giá */}
				<div className="flex flex-col items-center mb-4">
					<h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
					<div className="flex items-center gap-2">
						<FaStar className="text-yellow-400" />
						<span className="font-semibold text-yellow-600">{score}</span>
						<span className="text-gray-500">/ {count} lượt đánh giá</span>
					</div>
				</div>

				{/* Nút chuyển chế độ */}
				<div className="flex justify-center gap-4 mb-6">
					<button
						className={`px-4 py-2 rounded-full font-semibold transition-colors ${
							mode === "rate"
								? "bg-yellow-400 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-yellow-100"
						}`}
						onClick={() => setMode("rate")}
					>
						Đánh giá
					</button>
					<button
						className={`px-4 py-2 rounded-full font-semibold transition-colors ${
							mode === "history"
								? "bg-yellow-400 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-yellow-100"
						}`}
						onClick={() => setMode("history")}
					>
						Lịch sử đánh giá
					</button>
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
											style={{ position: "absolute", left: "1.2em", top: 0, width: "1em" }}
										></span>
									</span>
								);
							})}
						</div>
						<div className="text-lg font-bold text-yellow-600">{star}</div>
						{/* Box nhận xét */}
						<textarea
							className="w-full border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
							rows={3}
							placeholder="Nhập nhận xét của bạn..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						{/* Nút gửi đánh giá */}
						<button
							className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
							onClick={() => {}}
						>
							Gửi đánh giá
						</button>
					</div>
				)}

				{/* Chế độ lịch sử đánh giá */}
				{mode === "history" && (
					<div className="w-full h-64 flex items-center justify-center">
						<Line data={chartData} options={chartOptions} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Rating;
