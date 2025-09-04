import { render, act } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import RootNavigator, { RootStackParamList } from '../navigation/RootNavigator';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

describe('Navigation', () => {
  it('pushes Login screen', () => {
    render(
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    );
    act(() => navigationRef.navigate('Login'));
    expect(navigationRef.getCurrentRoute()?.name).toBe('Login');
  });
});
