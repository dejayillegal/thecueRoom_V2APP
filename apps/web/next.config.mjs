/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const isStaticExport = Boolean(process.env.STATIC_EXPORT);

export default {
  ...(isStaticExport ? { output: "export", images: { unoptimized: true } } : {}),
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  outputFileTracingRoot: process.cwd(),
};
