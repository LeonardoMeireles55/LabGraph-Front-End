import { CustomErrorProps } from './types/CustomErrorProps';

export default function CustomError({ code, title, message }: CustomErrorProps) {
  return (
    <main className='flex min-h-screen items-center justify-center bg-background'>
      <div className='flex flex-col items-center rounded-2xl bg-surface p-8 sm:p-10 backdrop-blur-sm gap-4'>
        <div className='transform text-[100px] sm:text-[140px] font-bold text-textSecondary'>
          {code}
        </div>
        <h1 className='text-2xl sm:text-4xl font-bold text-textSecondary underline'>{title}</h1>
        <p className='mt-4 sm:mt-6 text-sm sm:text-xl text-textSecondary'>{message}</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-12 h-12 mt-8 sm:w-18 sm:h-18 text-textSecondary'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </div>
    </main>
  );
}
