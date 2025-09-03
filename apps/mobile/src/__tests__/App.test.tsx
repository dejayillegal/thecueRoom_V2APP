import { render } from '@testing-library/react-native';
import App from '../../App';

describe('App', () => {
  it('renders landing screen', () => {
    const { getByText } = render(<App />);
    expect(getByText('Landing')).toBeTruthy();
  });
});
