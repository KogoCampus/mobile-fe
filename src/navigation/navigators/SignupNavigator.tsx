import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import EmailInput from '@screens/Auth/SchoolEmail';
import Confirmation from '@screens/Auth/Confirmation';
import Setup from '@screens/Auth/Setup';
import Information from '@screens/Auth/Information';
import { AppScreens, AppScreensParamList } from '../paramTypes';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function SignupNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.EMAILINPUT_SCREEN} screenOptions={options}>
            <Stack.Screen name={AppScreens.EMAILINPUT_SCREEN} component={EmailInput} />
            <Stack.Screen name={AppScreens.CONFIRMATION_SCREEN} component={Confirmation} />
            <Stack.Screen name={AppScreens.SETUP_SCREEN} component={Setup} />
            <Stack.Screen name={AppScreens.INFO_SCREEN} component={Information} />
        </Stack.Navigator>
    );
}

export default SignupNavigator;
