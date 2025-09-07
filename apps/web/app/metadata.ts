import type { Metadata } from 'next';
const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: 'thecueRoom',
  description: '…',
};
