import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { AppScreens, AppScreensParamList } from '../paramTypes';
import AppLoading from '../../screens/AppLoading';
import OnboardingScreen from '../../screens/Onboarding';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function Onboarding(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.APP_LOADING} screenOptions={options}>
            <Stack.Screen name={AppScreens.APP_LOADING} component={AppLoading} />
            <Stack.Screen name={AppScreens.ONBOARDING_SCREEN} component={OnboardingScreen} />
        </Stack.Navigator>
    );
}

export default Onboarding;
