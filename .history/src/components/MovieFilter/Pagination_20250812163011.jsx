import { useState } from "react";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [inputPage, setInputPage] = useState("");

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleInputPageChange = (e) => {
    const value = e.target.value;
    setInputPage(value);
  };

  const handleInputPageSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setInputPage("");
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-3 rounded-full transition-colors duration-200 ${
          currentPage === 1
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        <CgArrowLeft className="w-6 h-6" />
      </button>

      {/* Page input */}
      <div className="flex items-center gap-2 text-white bg-gray-700 px-4 py-2 rounded-3xl border border-gray-700">
        <span>Trang</span>
        <form
          onSubmit={handleInputPageSubmit}
          className="flex items-center gap-1"
        >
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={handleInputPageChange}
            placeholder={currentPage.toString()}
            className="w-16 px-3 py-1.5 bg-gray-700 border border-gray-500 rounded-md text-center text-white text-sm focus:outline-none focus:ring-0 focus:ring-yellow-400 focus:border-gray-300 focus:bg-stone-600 transition-all duration-200"
          />
          <span>/</span>
          <span className="font-normal text-white">{totalPages}</span>
        </form>
      </div>

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-3 rounded-full transition-colors duration-200 ${
          currentPage === totalPages
            ? "bg-transparent text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        <CgArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
