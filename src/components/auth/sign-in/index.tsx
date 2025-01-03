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
    <div className='bg-surface/80 w-full max-w-md transform rounded-xl border border-borderColor p-8 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl sm:p-10'>
      <div className='absolute right-4 top-4 z-50'>
        <ThemeToggle />
      </div>
      <div className='mb-8 text-center'>
        <div className='mb-6 flex justify-center text-textSecondary opacity-95 transition-transform duration-300 ease-in-out hover:scale-105'>
          <Logo className='h-20 w-auto' />
        </div>
        <h1 className='to-primary/70 bg-gradient-to-r from-primary bg-clip-text text-4xl font-bold text-textPrimary sm:text-5xl'>
          LabGraph
        </h1>
        <p className='mt-3 text-textSecondary'>Faça login para continuar</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className='space-y-6'>
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
          label='Senha'
          autocomplete='current-password'
          value={formData.password}
          onChange={handleChange}
        />

        <div className='flex items-center justify-between text-sm'>
          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              className='rounded border-borderColor text-primary transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:ring-offset-0'
            />
            <span className='text-textSecondary transition-colors duration-200 hover:text-textPrimary'>
              Lembrar-me
            </span>
          </label>
          <Link
            href='#'
            className='hover:text-primary/80 text-primary transition-colors duration-200'
          >
            Esqueceu a senha?
          </Link>
        </div>

        <SubmitButton />

        <p className='mt-6 text-center text-sm text-textSecondary'>
          Não tem uma conta?{' '}
          <Link
            href='/signup'
            className='hover:text-primary/80 font-medium text-primary transition-colors duration-200'
          >
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
