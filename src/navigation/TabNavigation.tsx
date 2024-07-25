import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import HomeNavigator from './navigators/HomeNavigator';
import ScheduleNavigator from './navigators/ScheduleNavigator';
import GroupNavigator from './navigators/GroupNavigator';
import { AppNavigators, AppScreensParamList } from './paramTypes';
import ProfileNavigator from './navigators/ProfileNavigator';

const Tab = createMaterialTopTabNavigator<AppScreensParamList>();

const getTabBarIcon = (routeName: string, color: string, size: number): JSX.Element | null => {
    switch (routeName) {
        case AppNavigators.HOME_NAVIGATOR:
            return <Entypo name="home" size={size} color={color} />;
        case AppNavigators.GROUP:
            return <MaterialCommunityIcons name="leaf-maple" size={size} color={color} />;
        case AppNavigators.SCHEDULE:
            return <Entypo name="calendar" size={size} color={color} />;
        case AppNavigators.PROFILE:
            return <MaterialIcons name="person" size={size} color={color} />;
        default:
            return null;
    }
};

function TabNavigation(): JSX.Element {
    return (
        <Tab.Navigator
            initialRouteName={AppNavigators.HOME_NAVIGATOR}
            tabBarPosition="bottom"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'lightgrey',
                tabBarIcon: ({ color, focused }) => getTabBarIcon(route.name, color, 24),
                tabBarIndicatorStyle: { backgroundColor: 'black' },
                tabBarStyle: { backgroundColor: 'white', justifyContent: 'center', paddingBottom: 25 },
                tabBarContentContainerStyle: {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                },
            })}>
            <Tab.Screen name={AppNavigators.HOME_NAVIGATOR} component={HomeNavigator} />
            <Tab.Screen name={AppNavigators.GROUP} component={GroupNavigator} />
            <Tab.Screen name={AppNavigators.SCHEDULE} component={ScheduleNavigator} />
            <Tab.Screen name={AppNavigators.PROFILE} component={ProfileNavigator} />
        </Tab.Navigator>
    );
}

export default TabNavigation;
