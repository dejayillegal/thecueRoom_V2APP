/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const isStaticExport = Boolean(process.env.STATIC_EXPORT);

export default {
  ...(isStaticExport ? { output: "export", images: { unoptimized: true } } : {}),
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  outputFileTracingRoot: process.cwd(),
  // Allow all hosts for Replit development environment
  experimental: {
    esmExternals: true
  },
  // Allow cross-origin requests for Replit proxy
  allowedDevOrigins: [process.env.REPLIT_DEV_DOMAIN || "*"],
  // Configure dev server to accept proxy requests
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  }
};
