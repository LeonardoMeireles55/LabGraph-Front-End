import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface TokenContextProps {
  token: string | null;
  loading: boolean;
}

const TokenContext = createContext<TokenContextProps>({
  token: null,
  loading: true,
});

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);

        if (
          router.pathname === '/auth/login' ||
          router.pathname === '/auth/signup' ||
          router.pathname === '/auth/forgot-password' ||
          router.pathname === '/about-us' ||
          router.pathname === '/'
        ) {
          setLoading(false);
          return;
        }

        const tokenResponse = await fetch('/api/get-token');

        if (!tokenResponse.ok || tokenResponse.status === 401) {
          setLoading(false);
          setToken(null);
          return router.push('/auth/login');
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
  }, [router]);

  const value = useMemo(() => ({ token, loading }), [token, loading]);
  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export const useToken = () => useContext(TokenContext);
