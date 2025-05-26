'use client'
import type { Metadata } from 'next'
import Layout from './layouts/Layout'
import StoreProvider from '@/app/StoreProvider'
import { ErrorBoundary } from '@/src/shared/lib/bugsnag'
import { QueryClient, QueryClientProvider } from 'react-query'
import Script from 'next/script'

// test
export const metadata: Metadata = {
  title: 'Newartspace — современное искусство, картины и художники',
  description:
    // eslint-disable-next-line max-len
    'Онлайн-галерея современного искусства: картины, художники, события. Покупка и продажа произведений искусства. NewArtSpace — пространство для ценителей и авторов.',
}

const queryClient = new QueryClient()

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Script id='yandex-metrika' strategy='afterInteractive'>
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(102167257, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
        <noscript>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<img src="https://mc.yandex.ru/watch/102167257" style="position:absolute; left:-9999px;" alt="" />',
            }}
          />
        </noscript>
        <ErrorBoundary>
          <StoreProvider>
            <QueryClientProvider client={queryClient}>
              <Layout>{children}</Layout>
            </QueryClientProvider>
          </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
