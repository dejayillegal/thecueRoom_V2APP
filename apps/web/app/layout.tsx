import './globals.css';
import { Inter, Source_Code_Pro } from 'next/font/google';
import type { ReactNode } from 'react';
import AuthHashRouter from '@/components/AuthHashRouter';

const inter = Inter({ subsets: ['latin'] });
const sourceCode = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: ReactNode }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const callbackPath = `${base}/callback`;
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${sourceCode.variable} bg-[var(--bg)] text-white`}>
        <AuthHashRouter callbackPath={callbackPath} />
        {children}
      </body>
    </html>
  );
}
