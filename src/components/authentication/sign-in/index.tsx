import AuthFormContainer from '@/components/authentication/layout/AuthFormContainer';
import CheckIcon from '@/components/shared/ui/icons/CheckBox';
import ErrorMessage from '@/components/shared/utils/components/error-message';
import { AtSign, Lock } from 'lucide-react';
import AuthLink from '../common/AuthLink';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';
import { useAuth } from '../hooks/useAuthentication';

const LoginForm = () => {
  const { formData, errors, handleChange, rememberMe, setRememberMe, handleSubmit } = useAuth(true);

  return (
    <AuthFormContainer>
      {errors && errors.length > 0 && (
        <ErrorMessage message={errors.map((error) => error.message).join(', ')} />
      )}
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
          <AuthLink text='' linkText='Forgot password?' href='#' />
        </div>

        <SubmitButton text='Sign-in' />
        <AuthLink text="Don't have an account?" linkText='Sign up' href='/auth/signup' />
      </form>
    </AuthFormContainer>
  );
};

export default LoginForm;
