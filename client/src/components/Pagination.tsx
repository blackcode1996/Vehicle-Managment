import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({currentPage = 1, totalPages = 10 }) => {
  const pageNumbers = [];
  const maxButtons = 5;

 
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  
  
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - (maxButtons - 1));
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4 flex justify-center mb-10">
      <button
        // onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-4 py-2 rounded bg-secondary text-neutral disabled:opacity-50"
      >
        Prev
      </button>

      {pageNumbers.map(number => (
        <Link to={`?page=${number}`} key={number}>
          <button
            // onClick={() => handlePagination(number)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === number ? "bg-sky-900 text-primary" : "bg-gray-200"
            }`}
          >
            {number}
          </button>
        </Link>
      ))}

      <button
        // onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-4 py-2 rounded bg-secondary text-neutral disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
