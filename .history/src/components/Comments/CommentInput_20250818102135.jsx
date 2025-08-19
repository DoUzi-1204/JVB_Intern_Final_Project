import React from "react";

const CommentInput = ({ isLoggedIn, value, onChange, onSubmit }) => {
  return (
    <div className="bg-[#181A20] rounded-xl p-4 shadow-lg">
      {/* Header */}
      <h3 className="text-xl font-bold text-white mb-3">Bình luận</h3>
      {/* Thông báo đăng nhập */}
      {!isLoggedIn && (
        <div className="text-gray-400 mb-3">
          Vui lòng đăng nhập để bình luận
        </div>
      )}
      {/* Ô nhập bình luận */}
      <form onSubmit={onSubmit} className="flex flex-col gap-0">
        <textarea
          className="bg-[#1F2128] text-white rounded-lg p-1 resize-none min-h-[80px] outline-none border-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Viết bình luận"
          maxLength={1000}
          value={value}
          onChange={onChange}
          disabled={!isLoggedIn}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{value.length} / 1000</span>
          <button
            type="submit"
            disabled={!isLoggedIn || !value.trim()}
            className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-300 transition disabled:opacity-50"
          >
            Gửi
            <span className="material-icons text-lg">send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
