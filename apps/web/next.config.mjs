import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@thecueroom/ui', '@thecueroom/schemas'],
  outputFileTracingRoot: path.resolve(__dirname, '../../')
};

export default nextConfig;
