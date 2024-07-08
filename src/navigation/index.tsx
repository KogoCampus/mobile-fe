import { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppNavigators, AppScreensParamList } from './paramTypes';
import Onboarding from './navigators/Onboarding';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator<AppScreensParamList>();

function AppNavigation(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigationContainerRef = useRef<NavigationContainerRef<any>>(null);

    const handleNavigationStateChange = async () => {
        const currentRouteName = navigationContainerRef?.current?.getCurrentRoute()?.name;
        console.log(`Screen: ${currentRouteName}`);
    };

    return (
        <NavigationContainer onStateChange={handleNavigationStateChange} ref={navigationContainerRef}>
            <Stack.Navigator initialRouteName={AppNavigators.ONBOARDING}>
                <Stack.Screen name={AppNavigators.ONBOARDING} component={Onboarding} />
                <Stack.Screen name={AppNavigators.TABBED_APP} component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
