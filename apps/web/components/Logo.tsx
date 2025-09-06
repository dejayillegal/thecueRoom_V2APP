import type { SVGProps } from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="#D1FF3D"
      role="img"
      aria-label="thecueRoom logo"
      {...props}
    >
      <circle cx="16" cy="16" r="16" />
    </svg>
  );
}

