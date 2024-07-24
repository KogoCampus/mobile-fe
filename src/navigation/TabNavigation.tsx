import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { AppScreens, AppScreensParamList, AppNavigators } from './paramTypes';
import ScheduleNavigator from './navigators/ScheduleNavigator';

const Tab = createBottomTabNavigator<AppScreensParamList>();

// TO BE DELETED -------------------------
//
function SampleHomeScreen(): JSX.Element {
    return <Text style={{ fontSize: 60 }}>test home screen</Text>;
}

// ---------------------------------------

function TabNavigation(): JSX.Element {
    // const useColorTheme
    return (
        <Tab.Navigator
            initialRouteName={AppScreens.HOME_SCREEN}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'lightgrey',
            })}>
            <Tab.Screen name={AppScreens.HOME_SCREEN} component={SampleHomeScreen} />
            <Tab.Screen name={AppNavigators.SCHEDULE} component={ScheduleNavigator} />
        </Tab.Navigator>
    );
}

export default TabNavigation;
