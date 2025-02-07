import { TokenProvider } from '@/components/authentication/contexts/TokenContext';
import { GraphProvider } from '@/components/charts/contexts/GraphContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <GraphProvider>
        <Component {...pageProps} />
      </GraphProvider>
    </TokenProvider>
  );
}
