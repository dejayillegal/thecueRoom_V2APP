/** @type {import('next').NextConfig} */
const isStatic = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  // Only enable static export in GH Pages builds
  ...(isStatic ? { output: 'export' } : {}),
  // Base path for GH Pages (e.g., /thecueRoom_V2APP)
  ...(isStatic && process.env.NEXT_PUBLIC_BASE_PATH
    ? { basePath: process.env.NEXT_PUBLIC_BASE_PATH }
    : {}),
  // Required when exporting images statically
  ...(isStatic ? { images: { unoptimized: true } } : {}),
  // Keep other config you already have here (merge, don't replace)
};

export default nextConfig;
