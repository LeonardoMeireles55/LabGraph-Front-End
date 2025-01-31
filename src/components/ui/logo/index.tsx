import Image from 'next/image';
import useTheme from '../theme/hooks/useTheme'

import lightmode from '../../../../public/logo-light.png';
import darkmode from '../../../../public/logo-dark.png';
import React from 'react';

interface LogoProps {
  className?: string;
  title?: string;
}

const Logo = ({ className, title = 'LabGraph' }: LogoProps) => {
  const { isLight } = useTheme();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image src={isLight ? lightmode : darkmode} alt="Logo" width={300} height={100} />
      <div className="flex items-center gap-1">
{/*         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-textPrimary opacity-80">
          {title}
        </h1> */}
        <p className="text-sm text-textPrimary md:text-lg opacity-80">®</p>
      </div>
    </div>
  );
};

export default Logo;
