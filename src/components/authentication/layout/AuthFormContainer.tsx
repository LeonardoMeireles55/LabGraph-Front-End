import Logo from '../../shared/ui/logo';
import ThemeToggle from '../../shared/ui/theme';

interface AuthFormContainerProps {
  children: React.ReactNode;
}

const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
  return (
    <div className='px-2 h-screen from-primary/20 bg-gradient-to-br to-background flex items-center justify-center'>
      <div className='w-full max-w-md transform rounded-xl border border-borderColor px-8 py-6 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl sm:px-12 sm:py-8 mx-auto'>
        <div className='absolute right-4 top-4 z-50'>
          <ThemeToggle />
        </div>
        <div className='mb-6 text-center'>
          <div className='flex justify-center text-secondary opacity-95 transition-transform duration-300 ease-in-out'>
            <Logo className='w-32 sm:w-40 md:w-48 lg:w-56 opacity-90' />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
