import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className='fixed bottom-0 w-full bg-transparent p-4 text-textSecondary'>
      <div className='container mx-auto flex items-center justify-center space-y-2 md:flex-row md:space-y-0'>
        <div className='text-sm md:text-base'>
          &copy; {new Date().getFullYear()} <strong>LabGraph</strong>. All rights reserved.
        </div>
        <span>
          <Link
            href='https://github.com/LeonardoMeireles55'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:opacity-80'
          >
            <Github
              size={24}
              strokeWidth={1.5}
              className='inline-block ml-4 fill-background rounded-full p-0'
            />
          </Link>
          <Link
            href='https://www.linkedin.com/in/leomeireles55'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:opacity-80'
          >
            <Linkedin
              size={24}
              strokeWidth={1.5}
              className='inline-block ml-4 fill-background rounded-full p-0'
            />
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
