import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Profile from '@screens/Profile/Profile';
import { AppScreens, AppScreensParamList } from '../paramTypes';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function ProfileNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.HOME_SCREEN} screenOptions={options}>
            <Stack.Screen name={AppScreens.PROFILE_SCREEN} component={Profile} />
        </Stack.Navigator>
    );
}

export default ProfileNavigator;
