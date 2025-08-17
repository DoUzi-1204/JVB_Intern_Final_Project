import React, { useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import CommentInput from "./CommentInput";

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const commentCount = 0; // demo số lượng
  const isLoggedIn = false; // demo trạng thái đăng nhập
  return (
    <div className="mt-8">
      {/* Header với icon, số lượng */}
      <div className="flex items-center gap-2 mb-2">
        <IoChatboxEllipses className="text-2xl text-white" />
        <span className="text-2xl font-semibold text-white">Bình luận </span>
      </div>
      {/* Thông báo đăng nhập căn trái */}
      <div className="text-gray-400 mb-3 t text-left">
        Vui lòng{" "}
        <span className="text-yellow-400 font-semibold cursor-pointer">
          đăng nhập
        </span>{" "}
        để tham gia bình luận.
      </div>
      {/* Ô nhập bình luận */}
      <div className="bg-[#181A20] rounded-xl p-4 shadow-lg">
        <form className="flex flex-col gap-3">
          <textarea
            className="bg-[#1F2128] text-white rounded-lg p-4 resize-none min-h-[80px] outline-none border-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Viết bình luận"
            maxLength={1000}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {comment.length} / 1000
            </span>
            <button
              type="submit"
              disabled={!isLoggedIn || !comment.trim()}
              className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-300 transition disabled:opacity-50"
            >
              Gửi
              <span className="material-icons text-lg">send</span>
            </button>
          </div>
          {/* Switch tiết lộ */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              className="form-checkbox rounded-full bg-gray-700 border-gray-500"
            />
            <span className="text-white text-sm">Tiết lộ?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
