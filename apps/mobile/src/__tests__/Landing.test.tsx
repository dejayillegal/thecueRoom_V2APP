import { render } from '@testing-library/react-native';
import Landing from '../screens/Landing';

describe('Landing', () => {
  it('renders fallback', () => {
    const { getByText } = render(<Landing />);
    expect(getByText('Landing')).toBeTruthy();
  });
});
