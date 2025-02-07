import Arrow from '@/features/shared/arrows';
import React, { useState } from 'react';

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
  const [showAllPages, setShowAllPages] = useState(false);

  const renderPageButtons = () => {
    if (totalPages === undefined) return null;
    let pages: (number | 'ellipsis')[] = [];
    if (showAllPages || totalPages <= 4) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalPages - 1);
    }
    return pages.map((page) =>
      page === 'ellipsis' ? (
        <button
          key={'ellipsis'}
          onClick={() => setShowAllPages(true)}
          className={`rounded-md px-2 text-textPrimary ${currentPage > 2 && currentPage < totalPages - 1 ? 'bg-muted' : 'bg-background'}`}
        >
          ...
        </button>
      ) : (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(() => page);
            if (showAllPages) setShowAllPages(false);
          }}
          className={`mx-1 rounded-md px-3 py-1 text-xs hover:bg-muted md:text-sm ${
            currentPage === page ? 'bg-muted' : 'bg-background'
          } text-textPrimary`}
        >
          {page + 1}
        </button>
      )
    );
  };

  return (
    <div className='flex w-full flex-col items-center bg-background py-4'>
      <div className='flex w-full items-center justify-center space-x-0'>
        <button
          aria-label='Go to previous page'
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
          className='rounded-md px-4 py-2 text-xs text-textPrimary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
        >
          <span className='flex flex-row items-center'>
            <Arrow direction='left' />
            Previous
          </span>
        </button>
        <div className='flex items-center'>{renderPageButtons()}</div>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={
            totalPages !== undefined
              ? currentPage === totalPages || dataFetched.length === 0
              : dataFetched.length === 0
          }
          className='rounded-md px-4 py-2 text-xs text-textPrimary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
        >
          <span className='flex flex-row items-center'>
            Next
            <Arrow direction='right' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnalyticsPagination;
