import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { LuFilter } from "react-icons/lu";
import { useState } from "react";

const Menu = ({
	variant = "desktop",
	genres = [],
	countries = [],
	loading = false,
	onClose,
}) => {
	const [genreOpen, setGenreOpen] = useState(false);
	const [countryOpen, setCountryOpen] = useState(false);

	// Desktop: dropdown mở khi hover, mobile: mở khi click
	const dropdownProps =
		variant === "desktop"
			? {
					onMouseEnter: () => setGenreOpen(true),
					onMouseLeave: () => setGenreOpen(false),
				}
			: {};
	const countryDropdownProps =
		variant === "desktop"
			? {
					onMouseEnter: () => setCountryOpen(true),
					onMouseLeave: () => setCountryOpen(false),
				}
			: {};

	// Layout
	return variant === "desktop" ? (
		<nav className="flex items-center gap-5 flex-shrink-0 ml-auto">
			{/* Thể Loại dropdown */}
			<div className="relative" {...dropdownProps}>
				<div
					className="flex items-center gap-1 text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300"
					onClick={() => variant === "mobile" && setGenreOpen((v) => !v)}
				>
					<span>Thể Loại</span>
					<FontAwesomeIcon icon={faCaretDown} className={`text-[12px] transition-transform duration-200 ${genreOpen ? "rotate-180" : ""}`} />
				</div>
				{genreOpen && (
					<div className="absolute top-full left-0 mt-2 w-[300px] bg-zinc-900/90 border border-gray-700/50 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-sm">
						<div className="p-4">
							{loading ? (
								<div className="text-center text-white">
									<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400 mx-auto"></div>
									<p className="mt-2 text-sm">Đang tải thể loại...</p>
								</div>
							) : (
								<div className="grid grid-cols-2 gap-2">
									{genres.map((item) => (
										<Link
											key={item.id}
											to={`/genre/${item.id}`}
											className="text-left text-white text-sm py-2 px-3 hover:text-yellow-400 transition-colors duration-200 block"
											onClick={onClose}
										>
											{item.name}
										</Link>
									))}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			{/* Quốc Gia dropdown */}
			<div className="relative" {...countryDropdownProps}>
				<div
					className="flex items-center gap-1 text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300"
					onClick={() => variant === "mobile" && setCountryOpen((v) => !v)}
				>
					<span>Quốc Gia</span>
					<FontAwesomeIcon icon={faCaretDown} className={`text-[12px] transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`} />
				</div>
				{countryOpen && (
					<div className="absolute top-full left-0 mt-2 w-[300px] bg-zinc-900/90 border border-gray-700/50 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-sm">
						<div className="p-4">
							<div className="grid grid-cols-2 gap-2">
								{countries.map((item) => (
									<Link
										key={item.iso_3166_1}
										to={`/country/${item.iso_3166_1}`}
										className="text-left text-white text-sm py-2 px-3 hover:text-yellow-400 transition-colors duration-200 block"
										onClick={onClose}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
			<Link to="/movies" className="text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300" onClick={onClose}>Phim Lẻ</Link>
			<Link to="/tv" className="text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300" onClick={onClose}>Phim Bộ</Link>
			<Link to="/actors" className="text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300" onClick={onClose}>Diễn Viên</Link>
			<Link to="/filter" className="flex items-center gap-1 text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300" onClick={onClose}>
				<span>Lọc Phim</span>
				<LuFilter className="w-3 h-3" />
			</Link>
			<Link to="/login" className="flex items-center gap-2 bg-gray-300 rounded-2xl px-3 py-0 text-white text-sm font-normal cursor-pointer hover:text-yellow-400 transition-all duration-300" onClick={onClose}>
				<UserIcon className="w-4 h-4 text-black" />
				<span className="text-black font-medium text-sm">Đăng nhập</span>
			</Link>
		</nav>
	) : (
		<div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex items-center justify-center" onClick={onClose}>
			<div className="bg-[#353a5a] rounded-2xl shadow-xl p-6 w-[350px] max-w-full" onClick={e => e.stopPropagation()}>
				<Link
					to="/login"
					className="flex items-center gap-2 bg-gray-200 rounded-xl px-4 py-2 mb-4 justify-center hover:bg-gray-300 transition"
					onClick={onClose}
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

export default Menu;
