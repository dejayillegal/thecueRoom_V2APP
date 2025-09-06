import { render, screen } from '@testing-library/react';
import Landing from '@/app/page';

vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/thecueRoom_V2APP');

describe('Landing', () => {
  it('renders the exact artwork from basePath', () => {
    render(<Landing />);
    const img = screen.getByAltText(/marketing landing/i) as HTMLImageElement;
    expect(img.src).toMatch(/\/thecueRoom_V2APP\/marketing\/MarketingLanding\.png$/);
  });
  it('renders the raw SVG logo inline', () => {
    render(<Landing />);
    const logo = screen.getByLabelText(/thecueRoom logo/i) as SVGElement;
    expect(logo.tagName.toLowerCase()).toBe('svg');
    expect(logo.querySelector('#blinkPath')).not.toBeNull();
  });
});
