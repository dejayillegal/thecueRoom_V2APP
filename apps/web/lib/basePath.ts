export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const withBase = (p: string) => {
  const s = p.startsWith('/') ? p : `/${p}`;
  return `${basePath}${s}`;
};
