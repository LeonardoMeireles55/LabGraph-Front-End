import { AuthProvider } from '@/components/auth/contexts/AuthContext';
import { GraphProvider } from '@/components/charts/contexts/GraphContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GraphProvider>
        <Component {...pageProps} />
      </GraphProvider>
    </AuthProvider>

  );
}
