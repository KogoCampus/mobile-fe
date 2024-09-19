import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Profile from '@screens/Profile/Profile';
import { AppScreens, AppScreensParamList } from '../paramTypes';
import Support from '@screens/Profile/Support';
import MyPosts from '@screens/Profile/MyPosts';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function ProfileNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.HOME_SCREEN} screenOptions={options}>
            <Stack.Screen name={AppScreens.PROFILE_SCREEN} component={Profile} />
            <Stack.Screen name={AppScreens.SUPPORT_SCREEN} component={Support} />
            <Stack.Screen name={AppScreens.MYPOST_SCREEN} component={MyPosts} />
        </Stack.Navigator>
    );
}

export default ProfileNavigator;
