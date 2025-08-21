import React from "react";

const ActorInfo = ({ actorId }) => {
const API_KEY = import.meta.env.VITE_API_KEY;

const genderMap = {
	1: "Nữ",
	2: "Nam",
	0: "Không xác định"
	const [actor, setActor] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
		fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=vi-VN`)
			.then((res) => res.json())
			.then((data) => {
	if (loading) return <div>Đang tải thông tin diễn viên...</div>;
	if (error || !actor) return <div>Không thể tải thông tin diễn viên.</div>;

			<img
				src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : "/logo.png"}
				alt={actor.name}
	<p className="mb-1"><span className="font-semibold">Giới tính:</span> {genderMap[actor.gender]}</p>
	<p className="mb-1"><span className="font-semibold">Ngày sinh:</span> {actor.birthday || "Không rõ"}</p>
	<div className="mt-2 text-sm text-gray-700">
				<p className="mt-1 whitespace-pre-line">{actor.biography || "Không có thông tin."}</p>
			</div>
		</div>
export default ActorInfo;
