import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GraphProvider } from '@/contexts/GraphContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <GraphProvider>
            <Component {...pageProps} />
        </GraphProvider>
    );
}
