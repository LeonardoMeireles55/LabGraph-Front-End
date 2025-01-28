import { AuthFormData } from '@/components/auth/types/Auth';
import { authService } from '@/services/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface ValidationError {
  field: string;
  message: string;
}

export const useAuth = (isLogin: boolean) => {
  const [formData, setFormData] = useState<AuthFormData>({
    identifier: '',
    password: '',
    username: '',
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
        errors.push({ field: 'identifier', message: 'Email or username is required' });
      }
      // For login, we don't validate email format since identifier can be username
    } else {
      // For signup, validate email and username separately
      if (!formData.identifier) {
        errors.push({ field: 'identifier', message: 'Email is required' });
      } else if (!emailRegex.test(formData.identifier)) {
        errors.push({ field: 'identifier', message: 'Invalid email format' });
      }

      if (!formData.username) {
        errors.push({ field: 'username', message: 'Username is required' });
      }
      if (formData.password !== formData.confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
      }
    }

    if (!formData.password) {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (formData.password.length < 6) {
      errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
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
          router.push('/hematology');
          return;
        }
      } else {
        const response = await authService.signUp({
          identifier: formData.identifier.trim(),
          password: formData.password,
          username: formData.username?.trim() ?? '',
        });

        if (response.ok) {
          router.push('/login');
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
