import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GHP_REPO_BASENAME || '';

const nextConfig = {
  // output: 'export', // Commented out to allow middleware and dynamic features
  images: { unoptimized: true },
  trailingSlash: true,
  ...(isGhPages && repoName
    ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}/` }
    : {}),
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === 'true', openAnalyzer: false })(nextConfig);
