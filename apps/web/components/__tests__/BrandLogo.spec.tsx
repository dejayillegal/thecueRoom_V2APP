/**
 * BrandLogo component test - prevents SVG mutations
 */
import { render } from '@testing-library/react';
import BrandLogo from '../BrandLogo';

describe('BrandLogo', () => {
  it('renders exact SVG without modifications', () => {
    const { container } = render(<BrandLogo />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 1000 1000');
    expect(svg).toHaveAttribute('aria-label', 'thecueRoom logo with anchored blink');
    
    // Ensure the blinking element exists
    const blinkPath = container.querySelector('#blinkPath');
    expect(blinkPath).toBeInTheDocument();
    expect(blinkPath).toHaveAttribute('fill', '#D1E231');
  });

  it('applies custom className correctly', () => {
    const { container } = render(<BrandLogo className="h-8 w-8" />);
    const svg = container.querySelector('svg');
    
    expect(svg).toHaveClass('h-8', 'w-8');
  });

  it('maintains accessibility attributes', () => {
    const { container } = render(<BrandLogo title="Custom title" />);
    const wrapper = container.querySelector('span');
    
    expect(wrapper).toHaveAttribute('aria-label', 'Custom title');
  });

  it('includes reduced motion CSS for accessibility', () => {
    const { container } = render(<BrandLogo />);
    const style = container.querySelector('style');
    
    expect(style?.textContent).toContain('@media (prefers-reduced-motion:reduce)');
    expect(style?.textContent).toContain('#blinkPath{animation:none;}');
  });
});