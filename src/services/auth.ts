import { AuthFormData } from '@/components/auth/types/Auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SignInParams {
  email: string;
  password: string;
  remember?: boolean;
}

export const authService = {
  signIn: async ({ email, password, remember }: SignInParams) => {
    try {
      const backendResponse = await fetch(`${API_BASE_URL}/users/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await backendResponse.json();

      if (!backendResponse.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      const cookieResponse = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          token: data.tokenJWT,
          dateExp: data.dateExp,
          remember,
        }),
      });

      return cookieResponse.json();
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  },

  async signUp(userData: Omit<AuthFormData, 'confirmPassword'>) {
    const response = await fetch(`${API_BASE_URL}/users/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return { ok: response.status === 204 };
  },
};
