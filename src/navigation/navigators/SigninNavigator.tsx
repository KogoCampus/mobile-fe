import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Signin from '@screens/Auth/Signin';
import { AppScreens, AppScreensParamList } from '../paramTypes';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function SigninNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.SIGNIN_SCREEN} screenOptions={options}>
            <Stack.Screen name={AppScreens.SIGNIN_SCREEN} component={Signin} />
        </Stack.Navigator>
    );
}

export default SigninNavigator;
