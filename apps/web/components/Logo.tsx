import type { SVGProps } from 'react';

const svgContent = `
  <style>
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.2; }
    }
    @media (prefers-reduced-motion: reduce) {
      #blinkPath {
        animation: none;
      }
    }
  </style>
  <g>
    <circle cx="16" cy="16" r="16" fill="#D1FF3D" />
    <path id="blinkPath" d="M16 8 V24 M8 16 H24" stroke="black" stroke-width="4" style="animation: blink 2s infinite;" />
  </g>
`;

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="thecueRoom logo"
      {...props}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
