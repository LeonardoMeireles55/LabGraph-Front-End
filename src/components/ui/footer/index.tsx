import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className='fixed bottom-0 w-full bg-background p-4 text-textSecondary'>
      <div className='container mx-auto flex items-center justify-center space-y-2 md:flex-row md:space-y-0'>
        <div className='text-sm md:text-base'>
          &copy; {new Date().getFullYear()} <strong>LabGraph</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
