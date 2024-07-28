'use client'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './sass/globals.sass'

const queryClient = new QueryClient()

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <title>DAPP - Penalty APP</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>

        <body>{children}</body>
      </html>
    </QueryClientProvider>
  )
}
