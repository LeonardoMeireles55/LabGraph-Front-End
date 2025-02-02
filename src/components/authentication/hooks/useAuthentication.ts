import { AuthFormData } from '@/components/authentication/types/Auth';
import { authService } from '@/services/auth-service';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface ValidationError {
  field: string;
  message: string;
}

export const useAuth = (isLogin: boolean) => {
  const [formData, setFormData] = useState<AuthFormData>({
    identifier: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isLogin) {
      if (!formData.identifier) {
        errors.push({ field: 'username', message: 'Username is required' });
      }
    } else {
      if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push({ field: 'email', message: 'Invalid email address' });
      }
      if (formData.password !== formData.confirmPassword) {
        errors.push({
          field: 'confirmPassword',
          message: 'Passwords do not match',
        });
      }
    }

    if (!formData.password) {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (formData.password.length < 6) {
      errors.push({
        field: 'password',
        message: 'Password must be at least 6 characters and one special character',
      });
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleAuth = async (isLoginRequest: boolean) => {
    try {
      if (isLoginRequest) {
        const response = await authService.signIn({
          identifier: formData.identifier.trim(),
          password: formData.password,
          remember: rememberMe,
        });

        if (response.success) {
          router.push('/charts/hematology');
          return;
        }
      } else {
        const response = await authService.signUp({
          identifier: formData.identifier.trim(),
          email: formData.email?.trim() ?? '',
          password: formData.password,
        });

        if (response.ok) {
          router.push('/auth/login');
          return;
        }
      }
      throw new Error('Authentication failed');
    } catch (err) {
      console.error('Auth error:', err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        setError(validationErrors.map((err) => err.message).join(', '));
        return;
      }

      await handleAuth(isLogin);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error connecting to the server. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    rememberMe,
    setRememberMe,
    handleChange,
    handleSubmit,
  };
};
