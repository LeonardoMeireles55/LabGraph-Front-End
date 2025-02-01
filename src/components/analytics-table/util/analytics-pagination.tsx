
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
        <div className='flex items-center justify-center py-4 space-x-2 fixed bottom-12 w-full bg-background'>
            <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 0}
                className='px-4 py-2 text-xs text-white transition-colors bg-opacity-100 rounded-md hover:bg-primaryDark bg-muted disabled:cursor-not-allowed disabled:opacity-25 md:text-base'
            >
                &larr;
            </button>
            <span className='text-xs text-textSecondary'>
                Page {currentPage + 1} of {totalPages ? totalPages : dataFetched.length}
            </span>
            <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className='px-4 py-2 text-xs text-white transition-colors bg-opacity-100 rounded-md hover:bg-primaryDark bg-border disabled:cursor-not-allowed disabled:opacity-25 md:text-base'
            >
                &rarr;
            </button>
        </div>
    );
};

export default AnalyticsPagination;