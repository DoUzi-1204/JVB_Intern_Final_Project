import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { FaMobileAlt } from "react-icons/fa";

const menuItems = [
	[
		{ label: "Chủ Đề", to: "/topics" },
		{ label: "Phim Lẻ", to: "/movies" },
		{ label: "Xem Chung", to: "/watch-together" },
		{ label: "Diễn Viên", to: "/actors" },
		{ label: <span className="flex items-center gap-1"><span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold mr-1">NEW</span>Rổ Bóng</span>, to: "/basketball" },
	],
	[
		{ label: <>Thể loại <span className="ml-1">&#9660;</span></>, to: "/genres" },
		{ label: "Phim Bộ", to: "/tv" },
		{ label: <>Quốc gia <span className="ml-1">&#9660;</span></>, to: "/countries" },
		{ label: "Lịch chiếu", to: "/schedule" },
	],
];

const Menu = ({ onClose }) => (
	<div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex items-center justify-center" onClick={onClose}>
		<div className="bg-[#353a5a] rounded-2xl shadow-xl p-6 w-[350px] max-w-full" onClick={e => e.stopPropagation()}>
			{/* Đăng nhập */}
			<Link
				to="/login"
				className="flex items-center gap-2 bg-gray-200 rounded-xl px-4 py-2 mb-4 justify-center hover:bg-gray-300 transition"
			>
				<UserIcon className="w-5 h-5 text-black" />
				<span className="text-black font-semibold">Thành viên</span>
			</Link>

			{/* Tải ứng dụng */}
			<div className="flex items-center gap-2 bg-[#4b528e] rounded-xl px-4 py-2 mb-4">
				<FaMobileAlt className="w-5 h-5 text-yellow-400" />
				<div>
					<div className="text-xs text-gray-200">Tải ứng dụng</div>
					<div className="font-bold text-white">RoPhim</div>
				</div>
			</div>

			{/* Các nút chức năng */}
			<div className="grid grid-cols-2 gap-x-6 gap-y-3">
						{menuItems.map((col) =>
							col.map((item, idx) => (
						<Link
							key={item.to + idx}
							to={item.to}
							className="text-white text-[15px] font-semibold py-2 px-2 rounded hover:text-yellow-400 transition flex items-center"
						>
							{item.label}
						</Link>
					))
				)}
			</div>
		</div>
	</div>
);

export default Menu;
