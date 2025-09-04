import Link from 'next/link';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Feed', href: '/feed' },
      { label: 'Discord', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Twitter', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background" aria-labelledby="footer-heading">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row">
        <p className="text-xs text-muted">
          © TheCueRoom {new Date().getFullYear()} – All rights reserved.
        </p>
        <nav aria-labelledby="footer-heading" className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-lime hover:underline focus-visible:text-lime focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
