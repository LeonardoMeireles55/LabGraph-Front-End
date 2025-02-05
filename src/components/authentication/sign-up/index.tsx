import Logo from '@/components/shared/ui/logo';
import ThemeToggle from '@/components/shared/ui/theme';
import ErrorMessage from '@/components/shared/utils/components/error-message';
import { AtSign, Lock, User } from 'lucide-react';
import Link from 'next/link';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';
import { useAuth } from '../hooks/useAuthentication';

const SignUpForm = () => {
  const { formData, error, handleChange, handleSubmit } = useAuth(false);

  return (
    <div className='w-full max-w-md transform rounded-xl border border-borderColor px-8 py-6 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl sm:px-12 sm:py-8 mx-auto'>
      <div className='absolute right-4 top-4 z-50'>
        <ThemeToggle />
      </div>
      <div className='mb-0 text-center'>
        <div className='flex justify-center text-secondary opacity-95 transition-transform duration-300 ease-in-out'>
          <Logo className='w-32 sm:w-40 md:w-48 lg:w-56 opacity-90' />
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className='mb-4 space-y-4'>
        <InputField
          id='identifier'
          type='text'
          label='Username'
          placeholder='Enter your username'
          value={formData.identifier}
          onChange={handleChange}
          icon={<User className='h-4 w-4 text-textSecondary' />}
        />
        <InputField
          id='email'
          type='email'
          label='Email'
          placeholder='Enter your email'
          value={formData.email ? formData.email : ''}
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
        <InputField
          id='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Confirm your password'
          value={formData.confirmPassword ?? ''}
          onChange={handleChange}
          icon={<Lock className='h-4 w-4 text-textSecondary' />}
        />
        <SubmitButton text='Create Account' />

        <p className='text-center text-xs sm:text-sm text-textSecondary'>
          Already have an account?{' '}
          <Link
            href='/auth/login'
            className='font-medium text-textPrimary transition-colors duration-200'
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
