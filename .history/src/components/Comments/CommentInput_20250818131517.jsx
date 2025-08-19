import React from "react";
import { IoSendSharp } from "react-icons/io5";

const CommentInput = ({ isLoggedIn, value, onChange, onSubmit }) => {
  return (
    <div className="bg-[#181A20] rounded-xl p-2 shadow-lg">
      <form onSubmit={onSubmit} className="flex flex-col gap-1">
        <textarea
          className="bg-[#1F2128] text-white text-sm rounded-lg p-4 resize-none min-h-[120px] outline-none border-none focus:ring-1 focus:ring-gray-200"
          placeholder="Viết bình luận"
          maxLength={1000}
          value={value}
          onChange={onChange}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{value.length} / 1000</span>
          <button
            type="submit"
            disabled={!isLoggedIn || !value.trim()}
            className="bg-transparent text-yellow-300 font-semibold px-6 py-2 rounded-lg flex items-center gap-2 hover:text-yellow-300 transition"
          >
            Gửi
            <IoSendSharp className="text-xl text-yellow-300" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
