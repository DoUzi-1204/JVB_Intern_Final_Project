import React, { useState } from "react";
import useActor from "../hooks/useActor";
import ActorGrid from "../components/Actor/ActorGrid";
import Pagination from "../components/MovieFilter/Pagination";

const ActorPage = () => {
  const [page, setPage] = useState(1);
  const { actors, loading, error, totalPages } = useActor(page);

  return (
    <div className="container mx-auto py-8">
      <ActorGrid actors={actors} />
      {loading && <div>Đang tải...</div>}
      {error && <div>Lỗi: {error.message}</div>}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ActorPage;
