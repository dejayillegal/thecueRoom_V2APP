import path from 'path';
import { fileURLToPath } from 'url';
import type { NextConfig } from 'next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
// IMPORTANT: replace with your repository name for GH Pages basePath
const repo = 'thecueRoom_V2APP';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  experimental: { externalDir: true },
  transpilePackages: ['@thecueroom/ui', '@thecueroom/schemas'],
  outputFileTracingRoot: path.resolve(__dirname, '../../')
};

export default nextConfig;
