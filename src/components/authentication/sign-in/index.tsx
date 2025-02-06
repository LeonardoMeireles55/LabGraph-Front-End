import CheckIcon from '@/components/shared/ui/icons/CheckBox';
import Logo from '@/components/shared/ui/logo';
import ThemeToggle from '@/components/shared/ui/theme';
import { AtSign, Lock } from 'lucide-react';
import Link from 'next/link';
import ErrorMessage from '../../shared/utils/components/error-message';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';
import { useAuth } from '../hooks/useAuthentication';

const LoginForm = () => {
  const { formData, error, handleChange, rememberMe, setRememberMe, handleSubmit } = useAuth(true);

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
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className='mb-4 space-y-4'>
          <InputField
            id='identifier'
            type='text'
            label='Email or Username'
            placeholder='Enter your email or username'
            value={formData.identifier}
            onChange={handleChange}
            icon={<AtSign className='h-4 w-4 text-textSecondary' />}
          />
          <InputField
            id='password'
            type='password'
            label='Password'
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            icon={<Lock className='h-4 w-4 text-textSecondary' />}
          />

          <div className='flex items-center justify-between text-xs sm:text-sm'>
            <CheckIcon text='Keep me logged in' checked={rememberMe} onChange={setRememberMe} />
            <Link href='#' className='text-textPrimary transition-colors duration-200'>
              Forgot password?
            </Link>
          </div>

          <SubmitButton text='Sign-in' />

          <p className='text-center text-xs sm:text-sm text-textSecondary'>
            Don&apos;t have an account?{' '}
            <Link
              href='/auth/signup'
              className='font-medium text-textPrimary transition-colors duration-200'
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
