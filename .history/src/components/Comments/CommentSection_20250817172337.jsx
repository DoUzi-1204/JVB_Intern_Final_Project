import CommentInput from "./CommentInput";

// ...existing code...

const CommentSection = ({ isLoggedIn, ...props }) => (
  <div className="mt-8">
    <CommentInput isLoggedIn={isLoggedIn} {...props} />
    {/* ...phần danh sách bình luận... */}
  </div>
);

// ...existing code...

export default CommentSection;