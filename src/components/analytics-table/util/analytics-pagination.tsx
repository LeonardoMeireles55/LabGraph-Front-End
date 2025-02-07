import React from 'react';

interface AnalyticsPaginationProps {
  currentPage: number;
  totalPages: number | undefined;
  dataFetched: any[];
  setCurrentPage: (setter: (prev: number) => number) => void;
}

const AnalyticsPagination: React.FC<AnalyticsPaginationProps> = ({
  currentPage,
  totalPages,
  dataFetched,
  setCurrentPage,
}) => {
  return (
    <div className='flex w-full items-center justify-center space-x-2 bg-background py-4'>
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 0}
        className='bg-muted rounded-md px-4 py-2 text-xs text-white transition-colors hover:bg-primaryLight disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
      >
        &larr;
      </button>
      <span className='text-xs text-textSecondary'>
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === totalPages || dataFetched.length === 0}
        className='bg-border rounded-md px-4 py-2 text-xs text-white transition-colors hover:bg-primaryLight disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
      >
        &rarr;
      </button>
    </div>
  );
};

export default AnalyticsPagination;
