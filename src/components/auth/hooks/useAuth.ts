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
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push({ field: 'email', message: 'Invalid email' });
    }

    if (!formData.password) {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (formData.password.length < 6) {
      errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
    }

    if (!isLogin) {
      if (!formData.username) {
        errors.push({ field: 'username', message: 'Username is required' });
      }
      if (formData.password !== formData.confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
      }
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

      const response = isLogin
        ? await authService.signIn({
            email: formData.email.trim(),
            password: formData.password,
          })
        : await authService.signUp({
            email: formData.email.trim(),
            password: formData.password,
            username: formData.username?.trim() ?? '',
          });

      if (response.tokenJWT) {
        await authService.setSession(response.tokenJWT);
        router.push('/hematology');
      } else {
        throw new Error(response.message || (isLogin ? 'Login failed' : 'Error creating account'));
      }
    } catch (err) {
      console.error('Auth error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error connecting to the server. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { formData, error, loading, handleChange, handleSubmit };
};
