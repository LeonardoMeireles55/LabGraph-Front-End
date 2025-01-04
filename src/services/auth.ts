import { AuthFormData } from '@/components/auth/types/Auth';
import checkResponse from '@/components/utils/helpers/checkResponse';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authService = {
  async signIn(credentials: Pick<AuthFormData, 'email' | 'password'>) {
    const response = await fetch(`${API_BASE_URL}/users/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await checkResponse(response);
  },

  async signUp(userData: Omit<AuthFormData, 'confirmPassword'>) {
    const response = await fetch(`${API_BASE_URL}/users/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await checkResponse(response);
  },

  async setSession(token: string) {
    return await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  },
};
