import React, { useState } from "react";
import useActor from "../hooks/useActor";
import ActorGrid from "../components/Actor/ActorGrid";
import Pagination from "../components/MovieFilter/Pagination";

const DEFAULT_TOTAL_PAGES = 500;

const ActorPage = () => {
  const [page, setPage] = useState(1);
  const { actors, loading, error, totalPages } = useActor(page);

  // Nếu totalPages > 500 thì chỉ hiển thị tối đa 500
  const displayTotalPages =
    totalPages > DEFAULT_TOTAL_PAGES ? DEFAULT_TOTAL_PAGES : totalPages;

  return (
    <div className=" bg-gray-900  py-36">
      <ActorGrid actors={actors} />
      {loading && <div>Đang tải...</div>}
      {error && <div>Lỗi: {error.message}</div>}
      <Pagination
        currentPage={page}
        totalPages={displayTotalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ActorPage;
