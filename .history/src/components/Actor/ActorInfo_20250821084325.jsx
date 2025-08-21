import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

const genderMap = {
	1: "Nữ",
	2: "Nam",
	0: "Không xác định"
};

const ActorInfo = ({ actorId }) => {
	const [actor, setActor] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!actorId) return;
		setLoading(true);
		fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=vi-VN`)
			.then((res) => res.json())
			.then((data) => {
				setActor(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, [actorId]);

	if (loading) return <div>Đang tải thông tin diễn viên...</div>;
	if (error || !actor) return <div>Không thể tải thông tin diễn viên.</div>;

	return (
		<div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
			<img
				src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : "/logo.png"}
				alt={actor.name}
				className="w-40 h-56 object-cover rounded mb-4 border"
			/>
			<h2 className="text-xl font-bold mb-2 text-center">{actor.name}</h2>
			<p className="mb-1"><span className="font-semibold">Giới tính:</span> {genderMap[actor.gender]}</p>
			<p className="mb-1"><span className="font-semibold">Ngày sinh:</span> {actor.birthday || "Không rõ"}</p>
			<div className="mt-2 text-sm text-gray-700">
				<span className="font-semibold">Tiểu sử:</span>
				<p className="mt-1 whitespace-pre-line">{actor.biography || "Không có thông tin."}</p>
			</div>
		</div>
	);
};

export default ActorInfo;
