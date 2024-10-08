import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import '@radix-ui/themes/styles.css';
import { Container, Theme } from '@radix-ui/themes';
import {
  ClerkProvider,
} from '@clerk/nextjs'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Issues Tracker',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
          <Theme>
            <Navbar />
            <Container><main className='p-5'>{children}</main></Container>
          </Theme>
      </body>
    </html>
    </ClerkProvider>
  )
}
