import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Home from '@screens/Home/Home';
import CreateNewPost from '@screens/Post/CreateNewPost';
import { AppScreens, AppScreensParamList } from '../paramTypes';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function HomeNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.HOME_SCREEN} screenOptions={options}>
            <Stack.Screen name={AppScreens.HOME_SCREEN} component={Home} />
            <Stack.Screen name={AppScreens.CREATEPOST_SCREEN} component={CreateNewPost} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;
