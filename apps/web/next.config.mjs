import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GHP_REPO_BASENAME || '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  ...(isGhPages && repoName
    ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}/` }
    : {})
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === 'true', openAnalyzer: false })(nextConfig);
