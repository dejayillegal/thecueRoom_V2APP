import './globals.css';
import { Inter, Source_Code_Pro } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });
const sourceCode = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${sourceCode.variable} bg-[var(--bg)] text-white`}>
        {children}
      </body>
    </html>
  );
}
