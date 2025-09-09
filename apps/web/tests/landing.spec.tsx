import { render, screen } from '@testing-library/react';
vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/thecueRoom_V2APP');
const Landing = (await import('@/app/page')).default;

describe('Landing', () => {
  it('renders the exact artwork from basePath', () => {
    render(<Landing />);
    const img = screen.getByAltText(/marketing landing/i) as HTMLImageElement;
    expect(img.src).toMatch(/\/thecueRoom_V2APP\/landing\.svg$/);
  });
  it('renders the raw SVG logo inline', () => {
    render(<Landing />);
    const logo = screen.getByLabelText(/thecueRoom logo/i) as unknown as SVGElement;
    expect(logo.tagName.toLowerCase()).toBe('svg');
    expect(logo.querySelector('#blinkPath')).not.toBeNull();
  });
});
