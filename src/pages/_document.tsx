import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <Script src="/theme.js" strategy="beforeInteractive" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
