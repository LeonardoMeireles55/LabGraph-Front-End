import { AuthFormData, LoginFormData } from '@/components/auth/types/Auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authService = {
  async signIn(credentials: Pick<LoginFormData, 'email' | 'password'>) {
    const response = await fetch(`${API_BASE_URL}/users/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  },

  async signUp(userData: Omit<AuthFormData, 'confirmPassword'>) {
    const response = await fetch(`${API_BASE_URL}/users/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return { ok: response.status === 204 };
  },

  async setSession(token: string) {
    return await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  },
};
