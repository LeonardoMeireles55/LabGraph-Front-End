import Logo from '@/components/ui/logo';
import ThemeToggle from '@/components/ui/theme';
import ErrorMessage from '@/components/utils/components/error-message';
import getStatusMessage from '@/components/utils/helpers/getStatusMessage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(getStatusMessage(data.message) || 'Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      console.error('Sign up error:', err);
    }
  };

  return (
    <div className='bg-surface/80 relative w-full rounded-xl border border-borderColor p-8 shadow-xl'>
      <div className='absolute right-4 top-4'>
        <ThemeToggle />
      </div>
      <div className='mb-8 text-center'>
        <div className='mb-4 flex justify-center text-textSecondary opacity-95'>
          <Logo className='h-20 w-auto' />
        </div>
        <h1 className='text-4xl font-bold text-textPrimary'>Criar Conta</h1>
        <p className='mt-2 text-textSecondary'>Preencha os dados para se registrar</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <InputField
          id='username'
          type='text'
          label='Nome de usuário'
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
          label='Senha'
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          id='confirmPassword'
          type='password'
          label='Confirmar senha'
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <SubmitButton text='Criar conta' />

        <p className='mt-4 text-center text-sm text-textSecondary'>
          Já tem uma conta?{' '}
          <Link href='/login' className='hover:text-primary/80 text-primary'>
            Fazer login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
