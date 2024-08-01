import { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { log } from '@lib/utils';
import { AppNavigators, AppScreensParamList } from './paramTypes';
import Onboarding from './navigators/Onboarding';
import TabNavigation from './TabNavigation';
import SigninNavigator from './navigators/SigninNavigator';
import ScheduleNavigator from './navigators/ScheduleNavigator';
import SignupNavigator from './navigators/SignupNavigator';
import GroupNavigator from './navigators/GroupNavigator';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function AppNavigation(): JSX.Element {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const navigationContainerRef = useRef<NavigationContainerRef<any>>(null);

    const handleNavigationStateChange = async () => {
        const currentRouteName = navigationContainerRef?.current?.getCurrentRoute()?.name;
        log.debug(`Screen: ${currentRouteName}`);
    };

    return (
        <NavigationContainer onStateChange={handleNavigationStateChange} ref={navigationContainerRef}>
            <Stack.Navigator initialRouteName={AppNavigators.ONBOARDING} screenOptions={options}>
                <Stack.Screen name={AppNavigators.ONBOARDING} component={Onboarding} />
                <Stack.Screen name={AppNavigators.SIGNIN} component={SigninNavigator} />
                <Stack.Screen name={AppNavigators.SIGNUP} component={SignupNavigator} />
                <Stack.Screen name={AppNavigators.TABBED_APP} component={TabNavigation} />
                <Stack.Screen name={AppNavigators.SCHEDULE} component={ScheduleNavigator} />
                <Stack.Screen name={AppNavigators.GROUP} component={GroupNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
