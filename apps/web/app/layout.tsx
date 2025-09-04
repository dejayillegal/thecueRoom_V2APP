import './globals.css';
import { Inter, Source_Code_Pro } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://thecueroom.com'),
  title: {
    default: 'TheCueRoom',
    template: '%s | TheCueRoom'
  },
  description:
    'Discover the next wave of underground music powered by community and tech.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${mono.variable} bg-background text-white`}>
        {children}
      </body>
    </html>
  );
}
