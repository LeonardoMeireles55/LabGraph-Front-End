import Logo from '@/components/ui/logo';
import ThemeToggle from '@/components/ui/theme';
import ErrorMessage from '@/components/utils/components/error-message';
import Link from 'next/link';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';
import { useAuth } from '../hooks/useAuth';

const SignUpForm = () => {

  const { formData, error, handleChange, handleSubmit } = useAuth(true);

  return (
    <div className='relative w-full rounded-xl border border-borderColor p-8 shadow-xl'>
      <div className='absolute right-4 top-4 z-50'>
        <ThemeToggle />
      </div>
      <div className='mb-8 text-center'>
        <div className='mb-4 flex justify-center text-textSecondary opacity-95'>
          <Logo className='h-20 w-auto' />
        </div>
        <h1 className='text-4xl font-bold text-textPrimary'>Create Account</h1>
        <p className='mt-2 text-textSecondary'>Fill in the details to register</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <InputField
          id='username'
          type='text'
          label='Username'
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          id='email'
          type='email'
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
        <InputField
          id='confirmPassword'
          type='password'
          label='Confirm Password'
          value={formData.confirmPassword ?? ''}
          onChange={handleChange}
        />

        <SubmitButton text='Create Account' />

        <p className='mt-4 text-center text-sm text-textSecondary'>
          Already have an account?{' '}
          <Link href='/login' className='text-primary'>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
