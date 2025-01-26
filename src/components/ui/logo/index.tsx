import Image from 'next/image';
import { useEffect, useState } from 'react';
import useTheme from '../theme/hooks/useTheme';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('/logo-dark.png');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    console.log('theme:');
    setImageSrc(isDark ? '/logo-dark.png' : '/logo-light.png');
  }, [toggleTheme]);

  return (
    <Image
      src={imageSrc}
      alt='LabGraph Logo'
      className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      width={500}
      height={500}
      priority
      onLoad={() => setIsLoading(false)}
    />
  );
};

export default Logo;
