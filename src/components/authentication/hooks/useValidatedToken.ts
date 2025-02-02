import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useValidatedToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        const tokenResponse = await fetch('/api/get-token');

        if (!tokenResponse.ok) {
          if (
            router.pathname !== '/auth/login' &&
            router.pathname !== '/auth/signup' &&
            router.pathname !== '/health-check'
          ) {
            setToken(null);
            router.push('/auth/login');
          }
          return;
        }

        const data = await tokenResponse.json();
        setToken(data.token);
      } catch (err) {
        console.error(err);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [router, setToken, setLoading]);

  return {
    token,
    loading: loading,
  };
};
