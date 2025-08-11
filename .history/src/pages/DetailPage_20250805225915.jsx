import React from "react";
import { useParams, useLocation } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes("/movie/");

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">
          {isMovie ? "Movie" : "TV"} Detail Page
        </h1>
        <p>ID: {id}</p>
        <p>Trang chi tiết phim sẽ được phát triển ở đây</p>
      </div>
    </div>
  );
};

export default DetailPage;
