import React from "react";
import { useParams } from "react-router-dom";

const WatchPage = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Watch Page</h1>
        <p>Movie/TV ID: {id}</p>
        <p>Trang xem phim sẽ được phát triển ở đây</p>
      </div>
    </div>
  );
};

export default WatchPage;