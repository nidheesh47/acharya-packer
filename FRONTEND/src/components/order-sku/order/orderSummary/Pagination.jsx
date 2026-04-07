import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
  currentItems
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="mt-6 sm:mt-8 px-3 sm:px-4 py-3 sm:py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl sm:rounded-b-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-xs sm:text-sm text-slate-700 text-center sm:text-left">
          Showing {startItem} to {endItem} of {totalItems} orders
        </div>
        
        <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Previous
          </button>
          
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-1 sm:px-2 text-xs sm:text-sm text-slate-500">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-2 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg transition-all ${
                    currentPage === page
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </div>
          
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
          >
            Next
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
          </button>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-4 flex justify-center sm:justify-start">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600">Items per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="text-xs px-2 py-1 border border-slate-300 rounded-lg bg-white"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
      </div>
    </div>
  );
}