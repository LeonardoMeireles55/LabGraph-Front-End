import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GraphProvider } from '@/contexts/GraphContext';
import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider locale="pt-BR">

        <GraphProvider>
            <Component {...pageProps} />
        </GraphProvider>
            </NextUIProvider>

    );
}
