import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Schedule from '../../screens/Schedule/Schedule';
import EditCourse from '../../screens/Schedule/EditCourse';
import EditSchedule from '../../screens/Schedule/EditSchedule';
import AddCourse from '../../screens/Schedule/AddCourse';
import { AppScreens, AppScreensParamList } from '../paramTypes';

const Stack = createStackNavigator<AppScreensParamList>();

const options: StackNavigationOptions = {
    headerShown: false,
};

function ScheduleNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.SCHEDULE_SCREEN} screenOptions={options}>
            <Stack.Screen name={AppScreens.SCHEDULE_SCREEN} component={Schedule} />
            <Stack.Screen name={AppScreens.EDIT_COURSE} component={EditCourse} />
            <Stack.Screen name={AppScreens.EDIT_SCHEDULE} component={EditSchedule} />
            <Stack.Screen name={AppScreens.ADD_COURSE} component={AddCourse} />
        </Stack.Navigator>
    );
}

export default ScheduleNavigator;
