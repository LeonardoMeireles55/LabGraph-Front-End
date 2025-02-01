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
          router.push('/login');
          return;
        }

        const data = await tokenResponse.json();
        setToken(data.token);
      } catch (err) {
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [router]);

  return {
    token,
    loading: loading,
  };
};
