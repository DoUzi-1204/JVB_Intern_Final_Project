import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { LuFilter } from "react-icons/lu";

const Menu = ({ onClose, genres, countries, loading }) => {
	// Dropdown state cho mobile menu
	const [genreOpen, setGenreOpen] = useState(false);
	const [countryOpen, setCountryOpen] = useState(false);

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex items-center justify-center" onClick={onClose}>
			<div className="bg-[#353a5a] rounded-2xl shadow-xl p-6 w-[350px] max-w-full" onClick={e => e.stopPropagation()}>
				{/* Đăng nhập */}
				<Link
					to="/login"
					className="flex items-center gap-2 bg-gray-200 rounded-xl px-4 py-2 mb-4 justify-center hover:bg-gray-300 transition"
				>
					<UserIcon className="w-5 h-5 text-black" />
					<span className="text-black font-semibold">Đăng nhập</span>
				</Link>

				<div className="grid grid-cols-2 gap-x-4 gap-y-2">
					{/* Thể Loại dropdown */}
					<div className="relative col-span-1">
						<button
							className="w-full flex items-center justify-between text-white text-[15px] font-semibold py-2 px-2 rounded hover:text-yellow-400 transition"
							onClick={() => setGenreOpen((v) => !v)}
						>
							<span>Thể Loại</span>
							<FontAwesomeIcon icon={faCaretDown} className={`ml-2 text-xs ${genreOpen ? "rotate-180" : ""}`} />
						</button>
						{genreOpen && (
							<div className="absolute left-0 top-full mt-2 w-[200px] max-h-60 overflow-y-auto bg-zinc-900 border border-gray-700 rounded shadow-xl z-50">
								{loading ? (
									<div className="text-center text-white py-2">Đang tải...</div>
								) : (
									genres.map((g) => (
										<Link
											key={g.id}
											to={`/genre/${g.id}`}
											className="block text-white text-sm py-2 px-3 hover:text-yellow-400"
											onClick={onClose}
										>
											{g.name}
										</Link>
									))
								)}
							</div>
						)}
					</div>

					{/* Quốc Gia dropdown */}
					<div className="relative col-span-1">
						<button
							className="w-full flex items-center justify-between text-white text-[15px] font-semibold py-2 px-2 rounded hover:text-yellow-400 transition"
							onClick={() => setCountryOpen((v) => !v)}
						>
							<span>Quốc Gia</span>
							<FontAwesomeIcon icon={faCaretDown} className={`ml-2 text-xs ${countryOpen ? "rotate-180" : ""}`} />
						</button>
						{countryOpen && (
							<div className="absolute left-0 top-full mt-2 w-[200px] max-h-60 overflow-y-auto bg-zinc-900 border border-gray-700 rounded shadow-xl z-50">
								{countries.map((c) => (
									<Link
										key={c.iso_3166_1}
										to={`/country/${c.iso_3166_1}`}
										className="block text-white text-sm py-2 px-3 hover:text-yellow-400"
										onClick={onClose}
									>
										{c.name}
									</Link>
								))}
							</div>
						)}
					</div>

					{/* Phim Lẻ */}
					<Link
						to="/movies"
						className="text-white text-[15px] font-semibold py-2 px-2 rounded hover:text-yellow-400 transition flex items-center"
						onClick={onClose}
					>
						Phim Lẻ
					</Link>

					{/* Phim Bộ */}
					<Link
						to="/tv"
						className="text-white text-[15px] font-semibold py-2 px-2 rounded hover:text-yellow-400 transition flex items-center"
						onClick={onClose}
					>
						Phim Bộ
					</Link>

					{/* Diễn Viên */}
					<Link
						to="/actors"
						className="text-white text-[15px] font-semibold py-2 px-2 rounded hover:text-yellow-400 transition flex items-center"
						onClick={onClose}
					>
						Diễn Viên
					</Link>

					{/* Lọc Phim */}
					<Link
						to="/filter"
						className="flex items-center gap-1 text-white text-[15px] font-semibold py-2 px-2 rounded hover:text-yellow-400 transition"
						onClick={onClose}
					>
						<span>Lọc Phim</span>
						<LuFilter className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</div>
	);
};

import { useState } from "react";
export default Menu;
