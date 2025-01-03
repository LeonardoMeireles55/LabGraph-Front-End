import { AuthFormData } from '@/components/auth/types/Auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authService = {
  async signIn(credentials: Pick<AuthFormData, 'email' | 'password'>) {
    const response = await fetch(`${API_BASE_URL}/user/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  },

  async signUp(userData: Omit<AuthFormData, 'confirmPassword'>) {
    const response = await fetch(`${API_BASE_URL}/user/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  async setSession(token: string) {
    return await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  },
};
