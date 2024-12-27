import { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthFormData } from '@/types/auth';
import { authService } from '@/services/auth';

export const useAuth = (isLogin: boolean) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      const response = isLogin
        ? await authService.signIn({ email: formData.email, password: formData.password })
        : await authService.signUp({ 
            email: formData.email, 
            password: formData.password, 
            username: formData.username 
          });

      if (response.tokenJWT) {
        await authService.setSession(response.tokenJWT);
        router.push('/hematology');
      } else {
        setError(response.message || (isLogin ? 'Login failed' : 'Erro ao criar conta'));
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return { formData, error, handleChange, handleSubmit };
};
