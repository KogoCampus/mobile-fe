import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeNavigator from './navigators/HomeNavigator';
import ScheduleNavigator from './navigators/ScheduleNavigator';
import GroupNavigator from './navigators/GroupNavigator';
import { AppNavigators, AppScreensParamList } from './paramTypes';

const Tab = createBottomTabNavigator<AppScreensParamList>();

const getTabBarIcon = (routeName: string, color: string, size: number) => {
    switch (routeName) {
        case AppNavigators.HOME_NAVIGATOR:
            return <Entypo name="home" size={size} color={color} />;
        case AppNavigators.GROUP:
            return <MaterialCommunityIcons name="leaf-maple" size={size} color={color} />;
        case AppNavigators.SCHEDULE:
            return <Entypo name="calendar" size={size} color={color} />;
        default:
            return null;
    }
};

const TabNavigation: React.FC = function () {
    return (
        <Tab.Navigator
            initialRouteName={AppNavigators.HOME_NAVIGATOR}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'lightgrey',
                tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
            })}>
            <Tab.Screen name={AppNavigators.HOME_NAVIGATOR} component={HomeNavigator} />
            <Tab.Screen name={AppNavigators.GROUP} component={GroupNavigator} />
            <Tab.Screen name={AppNavigators.SCHEDULE} component={ScheduleNavigator} />
        </Tab.Navigator>
    );
};

export default TabNavigation;
