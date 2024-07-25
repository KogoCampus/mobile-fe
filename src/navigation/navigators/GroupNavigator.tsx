import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import MyGroupList from '@screens/Group/MyGroupList';
import { AppScreens, AppScreensParamList } from '../paramTypes';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function GroupNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.GROUPLIST_SCREEN} screenOptions={options}>
            <Stack.Screen name={AppScreens.GROUPLIST_SCREEN} component={MyGroupList} />
        </Stack.Navigator>
    );
}

export default GroupNavigator;
