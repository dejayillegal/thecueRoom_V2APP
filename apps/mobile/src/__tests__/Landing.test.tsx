import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Landing from '../screens/Landing';

describe('Landing', () => {
  it('renders fallback', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Landing />
      </NavigationContainer>
    );
    expect(getByText('Landing')).toBeTruthy();
  });
});
