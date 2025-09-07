import type { Metadata } from 'next';

const site =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://dejayillegal.github.io/thecueRoom_V2APP';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: 'thecueRoom',
  description:
    'A social playground for cues, built with a Vite/React web app, Expo mobile app, and Node/Express + Drizzle backend.',
};
