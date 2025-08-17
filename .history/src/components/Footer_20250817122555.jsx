import React from "react";
import {
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa6";

const socialLinks = [
  {
    icon: FaFacebook,
    href: "#",
    color: "hover:bg-blue-600",
    title: "Facebook",
  },
  { icon: FaTiktok, href: "#", color: "hover:bg-black", title: "TikTok" },
  { icon: FaYoutube, href: "#", color: "hover:bg-red-600", title: "YouTube" },
  {
    icon: FaInstagram,
    href: "#",
    color: "hover:bg-pink-600",
    title: "Instagram",
  },
  {
    icon: FaXTwitter,
    href: "#",
    color: "hover:bg-black",
    title: "X (Twitter)",
  },
  {
    icon: FaTelegram,
    href: "#",
    color: "hover:bg-blue-500",
    title: "Telegram",
  },
  {
    icon: FaDiscord,
    href: "#",
    color: "hover:bg-indigo-600",
    title: "Discord",
  },
];

const navLinks = [
  { label: "Hỏi - Đáp", href: "#" },
  { label: "Chính sách bảo mật", href: "#" },
  { label: "Điều khoản sử dụng", href: "#" },
  { label: "Giới thiệu", href: "#" },
  { label: "Liên hệ", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-zinc-900">
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 flex flex-col items-center text-center">
            {/* Logo + Socials */}
            <div className="flex items-center gap-6">
              {/* Logo & Website Name */}
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="PhamNhanTuPhim Logo"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white font-[Dancing Script] drop-shadow-md tracking-wide">
                    Phàm Nhân Tu Phim
                  </h3>
                  <p className="text-yellow-400 text-sm">Tu phim độ kiếp</p>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {socialLinks.map(({ icon, href, color, title }) => {
                  const Icon = icon;
                  return (
                    <a
                      key={title}
                      href={href}
                      title={title}
                      className={`w-10 h-10 bg-gray-800 ${color} rounded-full flex items-center justify-center transition-colors`}
                    >
                      <Icon className="text-white text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed text-sm max-w-2xl">
              <span className="text-yellow-400 font-semibold">
                Phàm Nhân Tu Phim – Tu phim độ kiếp
              </span>{" "}
              - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết
              minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp,
              phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung
              Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền
              tảng phim trực tuyến hay nhất 2025 chất lượng 4K!
            </p>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">© 2025 Phàm Nhân Tu Phim.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
