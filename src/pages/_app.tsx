import { AuthProvider } from '@/components/auth/contexts/AuthContext';
import { GraphProvider } from '@/components/charts/contexts/GraphContext';
import { ThemeProvider } from '@/components/ui/theme/providers/ThemeProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GraphProvider>
        <ThemeProvider>
        <Component {...pageProps} />
        </ThemeProvider>
      </GraphProvider>
    </AuthProvider>

  );
}
