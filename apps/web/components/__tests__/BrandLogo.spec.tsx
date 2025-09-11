
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BrandLogo from '../BrandLogo';

describe('BrandLogo', () => {
  it('renders the exact logo SVG without modifications', () => {
    const { container } = render(<BrandLogo />);
    const svgElement = container.querySelector('svg');
    
    expect(svgElement).toBeDefined();
    expect(svgElement?.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svgElement?.getAttribute('viewBox')).toBe('0 0 1000 1000');
    expect(svgElement?.getAttribute('height')).toBe('40');
    expect(svgElement?.getAttribute('aria-label')).toBe('thecueRoom logo with anchored blink');
  });

  it('contains the exact required style and animation', () => {
    const { container } = render(<BrandLogo />);
    const styleElement = container.querySelector('style');
    
    expect(styleElement?.textContent).toContain('#blinkPath');
    expect(styleElement?.textContent).toContain('animation: blink 10s infinite');
    expect(styleElement?.textContent).toContain('@keyframes blink');
    expect(styleElement?.textContent).toContain('transform: scaleY(.14)');
    expect(styleElement?.textContent).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('contains the blink path element', () => {
    const { container } = render(<BrandLogo />);
    const blinkPath = container.querySelector('#blinkPath');
    
    expect(blinkPath).toBeDefined();
    expect(blinkPath?.getAttribute('fill')).toBe('#b2ff00');
  });

  it('contains all three path elements with correct fill color', () => {
    const { container } = render(<BrandLogo />);
    const pathElements = container.querySelectorAll('path[fill="#b2ff00"]');
    
    expect(pathElements).toHaveLength(3);
  });

  it('has the correct transform groups', () => {
    const { container } = render(<BrandLogo />);
    const mainGroup = container.querySelector('g[transform="translate(150, 150) scale(0.8)"]');
    const blinkGroup = container.querySelector('g[transform="translate(696.4375,390.4375)"]');
    
    expect(mainGroup).toBeDefined();
    expect(blinkGroup).toBeDefined();
  });

  it('maintains exact geometry paths', () => {
    const { container } = render(<BrandLogo />);
    const paths = container.querySelectorAll('path');
    
    // Verify we have exactly 3 paths
    expect(paths).toHaveLength(3);
    
    // Verify first path starts with expected coordinates
    expect(paths[0].getAttribute('d')).toContain('M0 0 C6.96680886 6.58190229');
    
    // Verify second path starts with expected coordinates
    expect(paths[1].getAttribute('d')).toContain('M0 0 C6.74416465 5.70826096');
    
    // Verify third path (blink path) starts with expected coordinates
    expect(paths[2].getAttribute('d')).toContain('M0 0 C8.13079618 8.13079618');
  });

  it('preserves accessibility attributes', () => {
    const { container } = render(<BrandLogo title="Test Logo" />);
    const wrapper = container.firstChild as HTMLElement;
    
    expect(wrapper?.getAttribute('aria-label')).toBe('Test Logo');
  });

  it('applies custom className correctly', () => {
    const { container } = render(<BrandLogo className="custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    
    expect(wrapper?.className).toContain('custom-class');
  });

  it('fails if logo content is modified', () => {
    // This test ensures any changes to the logo will be caught
    const { container } = render(<BrandLogo />);
    const svgHTML = container.innerHTML;
    
    // Critical checkpoints that must not change
    expect(svgHTML).toContain('fill="#b2ff00"');
    expect(svgHTML).toContain('id="blinkPath"');
    expect(svgHTML).toContain('animation: blink 10s infinite');
    expect(svgHTML).toContain('translate(150, 150) scale(0.8)');
    expect(svgHTML).toContain('translate(696.4375,390.4375)');
    expect(svgHTML).toContain('translate(708.87890625,182.99609375)');
    expect(svgHTML).toContain('translate(534.68359375,292.87109375)');
  });
});
