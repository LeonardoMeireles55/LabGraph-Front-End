import { AuthFormData } from '@/features/authentication/types/Auth';
import { AuthParams } from './types/AuthParams';
import { serverFetch } from './fetch-service';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authService = {

  signIn: async ({ identifier, password, remember }: AuthParams) => {
    try {

      const backendResponse = await serverFetch({
        route: `${API_BASE_URL}/users/sign-in`,
        method: 'POST',
        body: { identifier, password },
      })

      const cookieResponse = await serverFetch({
        route: '/api/login',
        method: 'POST',
        body: {
          token: backendResponse.tokenJWT,
          dateExp: backendResponse.dateExp,
          remember,
        },
      });

      return cookieResponse;

    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  },

  async signUp(userData: Omit<AuthFormData, 'confirmPassword'>) {
    try {
      const response = await serverFetch({
        route: `${API_BASE_URL}/users/sign-up`,
        method: 'POST',
        body: userData,
      });

      return response;

    } catch (e) {
      console.error('Error parsing response:', e);
    }
  },
};
