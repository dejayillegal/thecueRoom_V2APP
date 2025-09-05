import './globals.css';
import { Inter, Source_Code_Pro } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });
const sourceCode = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="dark" lang="en">
      <body className={`${inter.className} ${sourceCode.variable} bg-[#0B0B0B] text-white`}>
        {children}
      </body>
    </html>
  );
}
