import './globals.css';
import { Inter, Source_Code_Pro } from 'next/font/google';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import AuthHashRouter from '@/components/AuthHashRouter';
import ErrorBoundary from '@/components/ErrorBoundary';

export { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });
const sourceCode = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0B0B0B" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} ${sourceCode.variable} bg-[#0B0B0B] text-white antialiased`}>
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen bg-[#0B0B0B]" />}>
            <AuthHashRouter />
            {children}
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
