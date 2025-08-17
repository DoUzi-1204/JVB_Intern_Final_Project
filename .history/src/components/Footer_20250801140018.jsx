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

const Footer = () => {
  return (
    <footer className="bg-zinc-900">
      <div className="container mx-auto px-8 py-16">
        {/* Main Footer Content - Centered Layout */}
        <div className="max-w-4xl mx-auto">
          {/* All Content Centered */}
          <div className="space-y-8 flex flex-col items-center text-center">
            {/* Section 1: Logo + Website Name + Social Media Icons */}
            <div>
              {/* Logo & Website Name + Social Media Icons - Same line */}
              <div className="flex items-center gap-6">
                {/* Logo & Website Name */}
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="PhamNhanTuPhim Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3
                      className="text-2xl font-bold text-white"
                      style={{
                        fontFamily:
                          "'Dancing Script', 'Brush Script MT', cursive",
                        fontStyle: "normal",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                        letterSpacing: "1px",
                      }}
                    >
                      Phàm Nhân Tu Phim
                    </h3>
                    <p className="text-yellow-400 text-sm">Tu phim độ kiếp</p>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                    title="Facebook"
                  >
                    <FaFacebook className="text-white text-lg" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-colors"
                    title="TikTok"
                  >
                    <FaTiktok className="text-white text-lg" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                    title="YouTube"
                  >
                    <FaYoutube className="text-white text-lg" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                    title="Instagram"
                  >
                    <FaInstagram className="text-white text-lg" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-colors"
                    title="X (Twitter)"
                  >
                    <FaXTwitter className="text-white text-lg" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                    title="Telegram"
                  >
                    <FaTelegram className="text-white text-lg" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-colors"
                    title="Discord"
                  >
                    <FaDiscord className="text-white text-lg" />
                  </a>
                </div>
              </div>
            </div>

            {/* Section 2: Navigation Links */}
            <div>
              <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Hỏi - Đáp
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Chính sách bảo mật
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Điều khoản sử dụng
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Giới thiệu
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Liên hệ
                </a>
              </div>
            </div>

            {/* Section 3: Description */}
            <div>
              <p className="text-gray-400 leading-relaxed text-sm text-center">
                <span className="text-yellow-400 font-semibold">
                  Phàm Nhân Tu Phim – Tu phim độ kiếp
                </span>{" "}
                - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết
                minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp,
                phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung
                Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền
                tảng phim trực tuyến hay nhất 2025 chất lượng 4K!
              </p>
            </div>

            {/* Copyright Section */}
            <div>
              <p className="text-gray-500 text-sm text-center">
                © 2025 Phàm Nhân Tu Phim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
