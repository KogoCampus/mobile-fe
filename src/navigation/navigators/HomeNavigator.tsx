import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Home from '@screens/Home/Home';
import CreateNewPost from '@screens/Post/CreateNewPost';
import SearchResultScreen from '@screens/Home/SearchResult';
import NotificationScreen from '@screens/Home/Notifications';
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
            <Stack.Screen name={AppScreens.SEARCHRESULT_SCREEN} component={SearchResultScreen} />
            <Stack.Screen name={AppScreens.NOTIFICATION_SCREEN} component={NotificationScreen} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;
