import { render } from '@testing-library/react';
import Logo from './Logo';
import { describe, it, expect } from 'vitest';

describe('Logo', () => {
  it('renders', () => {
    const { getByLabelText } = render(<Logo />);
    expect(getByLabelText('thecueRoom logo')).toBeTruthy();
  });
});
