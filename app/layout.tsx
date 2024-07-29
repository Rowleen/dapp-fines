'use client'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './context/context'
import { Header } from './components'

import './sass/globals.sass'
import styles from './sass/layout.module.sass'

const queryClient = new QueryClient()

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <html lang='en'>
          <Head>
            <meta charSet='utf-8' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <title>DAPP - Penalty APP</title>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
          </Head>
          <body>
            <div className={styles.wrapper}>
              <div className={styles.home}>
                <Header />

                <section className={styles.titleWrapper}>
                  <h1 className={styles.title}>The place to fine others</h1>

                  <h2 className={styles.subtitle}>Let&apos;s do new friends</h2>
                </section>

                {children}
              </div>
            </div>
          </body>
        </html>
      </AppContextProvider>
    </QueryClientProvider>
  )
}
