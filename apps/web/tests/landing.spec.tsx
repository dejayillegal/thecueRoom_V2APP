import { render, screen } from '@testing-library/react';
import Landing from '@/app/page';

vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/thecueRoom_V2APP');

describe('Landing', () => {
  it('renders the exact artwork from basePath', () => {
    render(<Landing />);
    const img = screen.getByAltText(/marketing landing/i) as HTMLImageElement;
    expect(img.src).toMatch(/\/thecueRoom_V2APP\/marketing\/MarketingLanding\.png$/);
  });

  it('shows the exact logo file (not transformed)', () => {
    render(<Landing />);
    const logo = screen.getByAltText(/thecueRoom logo/i) as HTMLImageElement;
    expect(logo.src).toMatch(/\/thecueRoom_V2APP\/brand\/logo\.svg$/);
  });
});
