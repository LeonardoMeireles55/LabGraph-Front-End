import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='spinner h-12 w-12 animate-spin rounded-full border-t-4 text-primary justify-end' />
      {showMessage && <p className='text-sm text-textPrimary'>Try select other date range.</p>}
    </div>
  );
};

export default Loading;
