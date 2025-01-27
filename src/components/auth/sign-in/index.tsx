import { useAuth } from '@/components/auth/hooks/useAuth';
import Logo from '@/components/ui/logo';
import Link from 'next/link';
import ThemeToggle from '../../ui/theme';
import ErrorMessage from '../../utils/components/error-message';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';

const LoginForm = () => {
  const { formData, error, handleChange, handleSubmit } = useAuth(true);

  return (
    <div className='w-full max-w-md transform rounded-xl border border-borderColor px-8 py-8 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl sm:px-16 sm:py-16'>
      <div className='absolute right-4 top-4 z-50'>
        <ThemeToggle />
      </div>
      <div className='text-center'>
        <div className='flex justify-center text-textSecondary opacity-95 transition-transform duration-300 ease-in-out'>
          <Logo />
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <InputField
          id='email'
          type='text'
          label='Email'
          value={formData.email}
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
          <label className='flex items-center space-x-1'>
            <input
              type='checkbox'
              className='rounded border-borderColor text-textPrimary transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:ring-offset-0'
            />
            <span className='text-textSecondary transition-colors duration-200'>
              Remember me
            </span>
          </label>
          <Link
            href='#'
            className='text-textPrimary transition-colors duration-200'
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton text='Sign-in' />

        <p className='mt-6 text-center text-xs sm:text-sm text-textSecondary'>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='font-medium text-textPrimary transition-colors duration-200'
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
