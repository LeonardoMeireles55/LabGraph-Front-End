import Arrow from '@/features/shared/ui/arrows';
import React from 'react';
import { AnalyticsPaginationProps } from '../types/AnalyticsTable';
import PageButtons from './PageButtons';

const AnalyticsPagination: React.FC<AnalyticsPaginationProps> = ({
  currentPage,
  totalPages,
  dataFetched,
  setCurrentPage,
}) => {
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
        <div className='flex items-center'>
          {
            <PageButtons
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        </div>
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
