import React, { useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaTimes } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const mockTitle = "Tên phim mẫu";
const mockRating = 0;
const mockRatingCount = 0;
const mockHistory = {
	labels: Array.from({ length: 11 }, (_, i) => i),
	data: [0, 1, 2, 3, 2, 4, 5, 3, 2, 1, 0],
};

const Rating = ({ onClose }) => {
	const [mode, setMode] = useState('rate'); // 'rate' or 'history'
	const [star, setStar] = useState(0);
	const [hoverStar, setHoverStar] = useState(0);
	const [comment, setComment] = useState('');

	// Biểu đồ mẫu
	const chartData = {
		labels: mockHistory.labels,
		datasets: [
			{
				label: 'Số lượng đánh giá',
				data: mockHistory.data,
				fill: false,
				borderColor: '#f59e42',
				tension: 0.1,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: { display: false },
			tooltip: {},
		},
		scales: {
			x: {
				title: { display: true, text: 'Điểm (0-10)' },
			},
			y: {
				title: { display: true, text: 'Số lượng đánh giá' },
				beginAtZero: true,
			},
		},
	};

	// Xử lý chọn sao
	const handleStarClick = (value) => setStar(value);
	const handleStarHover = (value) => setHoverStar(value);
	const handleStarLeave = () => setHoverStar(0);

	// Render sao
	const renderStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			const value = i * 2;
			const halfValue = value - 1;
			if ((hoverStar || star) >= value) {
				stars.push(
					<FaStar
						key={value}
						color="#f59e42"
						size={32}
						style={{ cursor: 'pointer' }}
						onClick={() => handleStarClick(value)}
						onMouseEnter={() => handleStarHover(value)}
					/>
				);
			} else if ((hoverStar || star) >= halfValue) {
				stars.push(
					<FaStarHalfAlt
						key={halfValue}
						color="#f59e42"
						size={32}
						style={{ cursor: 'pointer' }}
						onClick={() => handleStarClick(halfValue)}
						onMouseEnter={() => handleStarHover(halfValue)}
					/>
				);
			} else {
				stars.push(
					<FaRegStar
						key={i}
						color="#ccc"
						size={32}
						style={{ cursor: 'pointer' }}
						onClick={() => handleStarClick(value)}
						onMouseEnter={() => handleStarHover(value)}
					/>
				);
			}
		}
		return <div onMouseLeave={handleStarLeave} style={{ display: 'flex', gap: 4 }}>{stars}</div>;
	};

	return (
		<div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
			background: 'rgba(0,0,0,0.5)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 9999,
		}}>
			<div style={{
				background: '#fff',
				borderRadius: 16,
				padding: 32,
				minWidth: 350,
				maxWidth: 400,
				position: 'relative',
				boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
			}}>
				{/* Nút đóng */}
				<FaTimes
					style={{ position: 'absolute', top: 16, right: 16, cursor: 'pointer' }}
					size={24}
					onClick={onClose}
				/>
				{/* Tiêu đề phim và điểm */}
				<div style={{ textAlign: 'center', marginBottom: 16 }}>
					<h2 style={{ fontWeight: 600, fontSize: 22 }}>{mockTitle}</h2>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
						<FaStar color="#f59e42" />
						<span style={{ fontWeight: 500 }}>{mockRating}</span>
						<span style={{ color: '#888', fontSize: 14 }}>/ {mockRatingCount} lượt đánh giá</span>
					</div>
				</div>
				{/* Chế độ */}
				<div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
					<button
						onClick={() => setMode('rate')}
						style={{
							padding: '6px 18px',
							borderRadius: 8,
							border: mode === 'rate' ? '2px solid #f59e42' : '1px solid #ccc',
							background: mode === 'rate' ? '#fff7ed' : '#fff',
							fontWeight: 500,
							cursor: 'pointer',
						}}
					>Đánh giá</button>
					<button
						onClick={() => setMode('history')}
						style={{
							padding: '6px 18px',
							borderRadius: 8,
							border: mode === 'history' ? '2px solid #f59e42' : '1px solid #ccc',
							background: mode === 'history' ? '#fff7ed' : '#fff',
							fontWeight: 500,
							cursor: 'pointer',
						}}
					>Lịch sử đánh giá</button>
				</div>
				{/* Nội dung theo chế độ */}
				{mode === 'rate' ? (
					<div>
						{/* 5 sao */}
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
							{renderStars()}
							<div style={{ fontWeight: 500, fontSize: 18 }}>{star}</div>
						</div>
						{/* Nhận xét */}
						<textarea
							value={comment}
							onChange={e => setComment(e.target.value)}
							placeholder="Nhập nhận xét của bạn..."
							style={{ width: '100%', minHeight: 60, marginTop: 16, borderRadius: 8, border: '1px solid #ccc', padding: 8, resize: 'vertical' }}
						/>
						{/* Nút gửi */}
						<button
							style={{
								marginTop: 16,
								width: '100%',
								padding: '10px 0',
								background: '#f59e42',
								color: '#fff',
								border: 'none',
								borderRadius: 8,
								fontWeight: 600,
								fontSize: 16,
								cursor: 'pointer',
							}}
							onClick={() => alert('Đã gửi đánh giá!')}
						>Gửi đánh giá</button>
					</div>
				) : (
					<div style={{ marginTop: 8 }}>
						<Line data={chartData} options={chartOptions} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Rating;
