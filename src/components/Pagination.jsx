import PropTypes from "prop-types";
import "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const generatePaginationNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) pageNumbers.push("...");
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages - 1) pageNumbers.push("...");
      if (totalPages > 1) pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = generatePaginationNumbers();

  return (
    <div className="flex justify-end items-center mt-4">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          « Previous
        </button>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => (typeof page === "number" ? setCurrentPage(page) : null)}
            disabled={page === "..."}
            className={`px-3 py-1 rounded text-sm ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : page === "..."
                ? "text-gray-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          Next »
        </button>
      </div>
    </div>
    
  );
};
Pagination.propTypes = {
  currentPage: PropTypes.array.isRequired,
  totalPages: PropTypes.array.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}

export default Pagination;
