import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/trending/all/";

const Trending = () => {
	const [timeWindow, setTimeWindow] = useState("day");
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchTrending = async () => {
			setLoading(true);
					try {
						const response = await fetch(`${BASE_URL}${timeWindow}?api_key=${API_KEY}&language=vi-VN`);
						const data = await response.json();
						setItems(data.results.slice(0, 10));
					} catch {
						setItems([]);
					}
			setLoading(false);
		};
		fetchTrending();
	}, [timeWindow]);

	return (
		<div className="bg-gray-900 p-4 rounded-lg mt-6 w-full md:w-80 max-h-[600px] overflow-y-auto">
			<h2 className="text-2xl font-bold text-white mb-4">Top phim</h2>
			<div className="flex gap-4 mb-6">
				<button
					className={`px-4 py-2 rounded ${timeWindow === "day" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
					onClick={() => setTimeWindow("day")}
				>
					Theo ngày
				</button>
				<button
					className={`px-4 py-2 rounded ${timeWindow === "week" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
					onClick={() => setTimeWindow("week")}
				>
					Theo tuần
				</button>
			</div>
			{loading ? (
				<div className="text-white">Đang tải...</div>
			) : (
				<ul className="space-y-4">
					{items.map((item, idx) => (
						<li key={item.id} className="flex items-center bg-gray-800 rounded-lg p-3 relative">
							<span className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-blue-400">{idx + 1}</span>
							<img
								src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : "https://via.placeholder.com/100x150?text=No+Image"}
								alt={item.title || item.name}
								className="mx-8 w-24 h-36 object-cover rounded shadow"
							/>
							<div className="flex-1">
								<div className="text-lg font-semibold text-white">
									{item.media_type === "movie" ? item.title : item.name}
								</div>
								<div className="text-gray-300 text-sm">
									{item.media_type === "movie" ? item.original_title : item.original_name}
								</div>
								<div className="flex gap-4 mt-2 text-gray-400 text-sm">
									<span>Điểm TMDB: <span className="font-bold text-yellow-400">{item.vote_average}</span></span>
									<span>Năm: {item.release_date ? item.release_date.slice(0,4) : (item.first_air_date ? item.first_air_date.slice(0,4) : "?")}</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Trending;
