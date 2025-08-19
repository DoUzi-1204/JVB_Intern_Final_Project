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
      <div className="flex items-center gap-2 mb-4">
        <IoChatboxEllipses className="text-2xl text-white" />
        <span className="text-2xl font-semibold text-white">
          Bình luận ({commentCount})
        </span>
      </div>
      <CommentInput
        isLoggedIn={isLoggedIn}
        value={comment}
        onChange={e => setComment(e.target.value)}
        onSubmit={e => {
          e.preventDefault();
          // Xử lý gửi bình luận tại đây
        }}
      />
    </div>
  );
};

export default CommentSection;
