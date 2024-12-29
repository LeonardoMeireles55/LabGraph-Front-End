import { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthFormData } from '@/components/auth/types/Auth';
import { authService } from '@/services/auth';

interface ValidationError {
  field: string;
  message: string;
}

export const useAuth = (isLogin: boolean) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (!formData.email) {
      errors.push({ field: 'email', message: 'Email é obrigatório' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push({ field: 'email', message: 'Email inválido' });
    }

    if (!formData.password) {
      errors.push({ field: 'password', message: 'Senha é obrigatória' });
    } else if (formData.password.length < 6) {
      errors.push({ field: 'password', message: 'Senha deve ter no mínimo 6 caracteres' });
    }

    if (!isLogin) {
      if (!formData.username) {
        errors.push({ field: 'username', message: 'Nome de usuário é obrigatório' });
      }
      if (formData.password !== formData.confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'As senhas não coincidem' });
      }
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        setError(validationErrors.map(err => err.message).join(', '));
        return;
      }

      const response = isLogin
        ? await authService.signIn({ 
            email: formData.email.trim(), 
            password: formData.password 
          })
        : await authService.signUp({ 
            email: formData.email.trim(), 
            password: formData.password, 
            username: formData.username?.trim() ?? '' 
          });

      if (response.tokenJWT) {
        await authService.setSession(response.tokenJWT);
        router.push('/hematology');
      } else {
        throw new Error(response.message || (isLogin ? 'Falha no login' : 'Erro ao criar conta'));
      }
    } catch (err) {
      console.error('Auth error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { formData, error, loading, handleChange, handleSubmit };
};