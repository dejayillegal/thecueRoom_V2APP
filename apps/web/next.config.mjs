/** @type {import('next').NextConfig} */
const isGhPages = process.env.NEXT_PUBLIC_BASE_PATH?.length > 0 || process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // Generate static HTML in ./out (Next 15+)
  output: 'export',
  // If you self-host images or use <img>, turn off the image optimizer for export
  images: { unoptimized: true },
  // Optional: for GitHub Pages (serves under /<repo>)
  ...(isGhPages
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;

