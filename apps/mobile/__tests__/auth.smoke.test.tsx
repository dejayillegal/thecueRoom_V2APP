import { render } from '@testing-library/react-native';
import Login from '../src/screens/Login';

jest.mock('../src/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn(),
      signInWithOAuth: jest.fn(),
      mfa: { enroll: jest.fn(), verify: jest.fn() },
      getUser: jest.fn(),
      setSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
    },
  },
}));

test('renders Login screen', () => {
  render(<Login />);
});
