import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import CommentInput from "./CommentInput";

const CommentSection = () => {
  const [tab, setTab] = useState("comment");
  const commentCount = 65; // demo số lượng
  return (
    <div className="mt-8">
      {/* Header với icon, số lượng, tab chuyển */}
      <div className="flex items-center gap-3 mb-2">
        <FaRegCommentDots className="text-2xl text-white" />
        <span className="text-xl font-bold text-white">Bình luận ({commentCount})</span>
        <div className="ml-4 flex gap-0 bg-[#23242A] rounded-lg overflow-hidden border border-white/20">
          <button
            className={`px-4 py-1 text-sm font-semibold ${tab === "comment" ? "bg-white text-black" : "text-white"}`}
            onClick={() => setTab("comment")}
          >
            Bình luận
          </button>
          <button
            className={`px-4 py-1 text-sm font-semibold ${tab === "review" ? "bg-white text-black" : "text-white"}`}
            onClick={() => setTab("review")}
          >
            Đánh giá
          </button>
        </div>
      </div>
      {/* Thông báo đăng nhập */}
      <div className="text-gray-400 mb-3">
        Vui lòng{" "}
        <span className="text-yellow-400 font-semibold cursor-pointer">đăng nhập</span> để tham gia bình luận.
      </div>
      {/* Ô nhập bình luận */}
      <div className="bg-[#181A20] rounded-xl p-4 shadow-lg">
        <form className="flex flex-col gap-3">
          <textarea
            className="bg-[#1F2128] text-white rounded-lg p-4 resize-none min-h-[80px] outline-none border-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Viết bình luận"
            maxLength={1000}
            disabled
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">0 / 1000</span>
            <button
              type="submit"
              disabled
              className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-300 transition disabled:opacity-50"
            >
              Gửi
              <span className="material-icons text-lg">send</span>
            </button>
          </div>
          {/* Switch tiết lộ */}
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" disabled className="form-checkbox rounded-full bg-gray-700 border-gray-500" />
            <span className="text-white text-sm">Tiết lộ?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;