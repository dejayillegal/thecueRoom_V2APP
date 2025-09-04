import { render, act, cleanup } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import RootNavigator, { RootStackParamList } from '../navigation/RootNavigator';

afterEach(cleanup);

describe('Navigation', () => {
  it('pushes Login screen', () => {
    const navigationRef = createNavigationContainerRef<RootStackParamList>();
    render(
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    );
    act(() => navigationRef.navigate('Login'));
    expect(navigationRef.getCurrentRoute()?.name).toBe('Login');
  });
});
