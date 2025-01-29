import Image from 'next/image';
import useTheme from '../theme/hooks/useTheme'



import lightmode from './img/lightmode.png';
import darkmode from './img/darkmode.png'

interface LogoProps {
  className?: string;
  tittle?: string;
}

const Logo = ({ className, tittle = 'LabGraph' }: LogoProps) => {
  const { isLight } = useTheme();

  console.log('Tema atual:', isLight ? 'light' : 'dark');
 
  return (
    <div className={`flex flex-col items-center ${className}`}>
   <Image
        src={isLight ? lightmode : darkmode} 
        alt="Logo"
        width={300}
        height={100}
       
      />
      <div className="flex items-center gap-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-textPrimary opacity-80">
          {tittle}
        </h1>
        <p className="text-sm text-textPrimary md:text-lg opacity-80">®</p>
        
      </div>
    </div>
  )
};

export default Logo;
