import AuthFormContainer from '@/components/authentication/layout/AuthFormContainer';
import ErrorMessage from '@/components/shared/utils/components/error-message';
import { AtSign, Lock, User } from 'lucide-react';
import AuthLink from '../common/AuthLink';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';
import { useAuth } from '../hooks/useAuthentication';

const SignUpForm = () => {
  const { formData, errors, handleChange, handleSubmit } = useAuth(false);

  return (
    <AuthFormContainer>
      {errors && errors.length > 0 && (
        <ErrorMessage message={errors.map((error) => error.message).join(', ')} />
      )}
      <form onSubmit={handleSubmit} className='mb-4 space-y-4' autoComplete='off'>
        <InputField
          id='identifier'
          type='text'
          label='Username'
          placeholder='Enter your username'
          value={formData.identifier}
          onChange={handleChange}
          icon={<User className='size-4 text-textSecondary' />}
        />
        <InputField
          id='email'
          type='email'
          label='Email'
          placeholder='Enter your email'
          value={formData.email ? formData.email : ''}
          onChange={handleChange}
          icon={<AtSign className='size-4 text-textSecondary' />}
        />
        <InputField
          id='password'
          type='password'
          label='Password'
          placeholder='Enter your password'
          value={formData.password}
          onChange={handleChange}
          icon={<Lock className='size-4 text-textSecondary' />}
        />
        <InputField
          id='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Confirm your password'
          value={formData.confirmPassword ?? ''}
          onChange={handleChange}
          icon={<Lock className='size-4 text-textSecondary' />}
        />
        <SubmitButton text='Create Account' />
        <AuthLink text='Already have an account?' linkText='Sign in' href='/auth/login' />
      </form>
    </AuthFormContainer>
  );
};

export default SignUpForm;
