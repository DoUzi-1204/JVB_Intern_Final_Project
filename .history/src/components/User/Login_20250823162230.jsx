import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiX } from "react-icons/fi";

const Login = ({
  logoSrc = "/logo.png",
  bgSrc = "/login_background.jpg",
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder behaviour: set success after short delay
    setStatus(null);
    setTimeout(() => setStatus("success"), 600);
  };

  const handleGoogle = () => {
    // Placeholder for Google sign-in
    setStatus(null);
    setTimeout(() => setStatus("success"), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[90%] max-w-4xl bg-transparent rounded-lg overflow-hidden shadow-2xl grid grid-cols-12">
        {/* Left image area */}
        <div
          className="col-span-7 relative hidden sm:block bg-cover bg-center"
          style={{ backgroundImage: `url(${bgSrc})`, minHeight: "520px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/80 to-transparent" />
          <div className="absolute left-6 bottom-6 flex items-center gap-3 text-white">
            <img
              src={logoSrc}
              alt="logo"
              className="w-14 h-14 object-contain"
            />
            <div>
              <div className="text-2xl font-bold">TuPhim</div>
              <div className="text-sm opacity-80">Phim hay độ kiếp</div>
            </div>
          </div>
        </div>

        {/* Right form area */}
        <div className="col-span-12 sm:col-span-5 bg-[#131428] p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white opacity-70 hover:opacity-100"
            aria-label="close"
          >
            <FiX size={20} />
          </button>

          <h2 className="text-2xl font-semibold text-white mb-3">Đăng nhập</h2>
          <p className="text-sm text-gray-300 mb-6">
            Nếu bạn chưa có tài khoản,{" "}
            <span className="text-yellow-300">đăng ký ngay</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d1220] border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500"
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d1220] border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500"
            />

            <button
              type="submit"
              className="w-full bg-yellow-300 text-black font-semibold py-3 rounded-md hover:brightness-95 transition"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            Quên mật khẩu?
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogle}
              className="w-full bg-white text-gray-800 py-2 rounded-md flex items-center justify-center gap-3 shadow"
            >
              <FcGoogle size={20} /> Đăng nhập bằng Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
