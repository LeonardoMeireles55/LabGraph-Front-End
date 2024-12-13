import React from 'react';
export const runtime = 'edge';

interface ErrorPageProps {
  statusCode: number;
}

const ErrorPage: React.FC<ErrorPageProps> & { getInitialProps: ({ res, err }: { res: any; err: any }) => { statusCode: number } } = ({ statusCode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
        <p className="text-xl text-gray-700 mb-4">
          {statusCode
            ? `An error occurred while processing your request. Status code: ${statusCode}`
            : 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
