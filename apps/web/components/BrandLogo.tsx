'use client';

export default function BrandLogo({ className }: { className?: string }) {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Use the EXACT file we copied; do not inline-transform.
  return (
    <img
      src={`${prefix}/brand/logo.svg`}
      alt="thecueRoom logo"
      className={className}
      draggable={false}
    />
  );
}
