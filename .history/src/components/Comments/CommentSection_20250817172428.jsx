import CommentInput from "./CommentInput";

const CommentSection = () => (
  <div className="mt-8">
    <CommentInput isLoggedIn={false} value="" onChange={() => {}} onSubmit={() => {}} />
    {/* ...phần danh sách bình luận sẽ thêm sau... */}
  </div>
);

export default CommentSection;