import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import MyGroupList from '@screens/Group/MyGroupList';
import CreateNewGroup from '@screens/Group/CreateNewGroup';
import { AppScreens, AppScreensParamList } from '../paramTypes';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function GroupNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.GROUPLIST_SCREEN} screenOptions={options}>
            <Stack.Screen name={AppScreens.GROUPLIST_SCREEN} component={MyGroupList} />
            <Stack.Screen name={AppScreens.CREATEGROUP_SCREEN} component={CreateNewGroup} />
        </Stack.Navigator>
    );
}

export default GroupNavigator;
