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
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isLogin) {
      if (!formData.identifier) {
        errors.push({ field: 'identifier', message: 'Identifier is required.' });
      }
      if (!formData.password) {
        errors.push({ field: 'password', message: 'Password is required.' });
      }
    } else {
      if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push({ field: 'email', message: 'A valid email address is required.' });
      }
      if (!formData.password) {
        errors.push({ field: 'password', message: 'Password is required.' });
      } else if (formData.password.length < 4 || !/[!@#$%^&*]/.test(formData.password)) {
        errors.push({
          field: 'password',
          message: 'Password must be at least 4 characters long and include one special character.',
        });
      }
      if (!formData.confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'Confirm Password is required.' });
      } else if (formData.password !== formData.confirmPassword) {
        errors.push({
          field: 'confirmPassword',
          message: 'Passwords do not match.',
        });
      }
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
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

        if (response.status === 409) {
          throw new Error('Signup was unsuccessful. Please verify your details and try again.');
        }
      }
      throw new Error('Please verify your details and try again.');
    } catch (err) {
      console.error('Auth error:', err);
      let errorMessage = 'An unknown error occurred.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      throw new Error(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await handleAuth(isLogin);
    } catch (err) {
      setErrors([
        { field: 'general', message: err instanceof Error ? err.message : 'Server error.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    rememberMe,
    setRememberMe,
    handleChange,
    handleSubmit,
  };
};
