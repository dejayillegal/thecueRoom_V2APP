import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';
import Page from '@/app/page';

describe('landing page', () => {
  it('renders hero image', () => {
    // Render within the layout to catch validateDOMNesting warnings early
    render(
      <RootLayout>
        {/* @ts-expect-error children is ReactNode */}
        <div><Page /></div>
      </RootLayout> as any
    );
    expect(screen.getByAltText(/thecueRoom landing/i)).toBeInTheDocument();
  });
});
