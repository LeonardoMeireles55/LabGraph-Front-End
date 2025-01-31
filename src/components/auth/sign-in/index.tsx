import { useAuth } from '@/components/auth/hooks/useAuth';
import Logo from '@/components/ui/logo';
import Link from 'next/link';
import ThemeToggle from '../../ui/theme';
import ErrorMessage from '../../utils/components/error-message';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';
import CheckIcon from '@/components/ui/icons/CheckBox';
import Footer from '@/components/ui/footer';

const LoginForm = () => {
  const { formData, error, handleChange, rememberMe, setRememberMe, handleSubmit } = useAuth(true);

  return (
    <div className='w-full max-w-md transform rounded-xl border border-borderColor px-8 py-6 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl sm:px-12 sm:py-12'>
      <div className='absolute right-4 top-4 z-50'>
        <ThemeToggle />
      </div>
      <div className='text-center'>
        <div className='flex justify-center text-secondary opacity-95 transition-transform duration-300 ease-in-out'>
          <Logo className='w-32 sm:w-40 md:w-48 lg:w-56 opacity-90' />
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className='space-y-1.5'>
        <InputField
          id='identifier'
          type='text'
          label='Email or Username'
          value={formData.identifier}
          onChange={handleChange}
        />
        <InputField
          id='password'
          type='password'
          label='Password'
          value={formData.password}
          onChange={handleChange}
        />

        <div className='flex items-center justify-between text-xs sm:text-sm'>
          <CheckIcon
            text="Keep me logged in"
            checked={rememberMe}
            onChange={setRememberMe}
          />
          <Link
            href='#'
            className='text-textPrimary transition-colors duration-200'
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton text='Sign-in' />

        <p className='text-center text-xs sm:text-sm text-textSecondary'>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='font-medium text-textPrimary transition-colors duration-200'
          >
            Sign up
          </Link>
        </p>
      </form>
      <div className='flex flex-rol w-full justify-center h-12 md:h-6'>
        <Footer />
      </div>
    </div>
  );
};

export default LoginForm;
