import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Scheduler from '@components/feature-schedule/Schedular';
import Skeleton from '@components/ui/Skeleton';
import Typography from '@components/ui/Typography';
import * as SecureStore from 'expo-secure-store';
import { AppScreens, AppNavigators, AppScreensParamList } from '@navigation/paramTypes';
import { Course } from './types';

const colorThemes: Record<string, string[]> = {
    default: ['#7dd1c2', '#79a5e8', '#a7ca71', '#fcaa67', '#9f86e2', '#77ca87', '#d397ed', '#ecc267', '#f08776'],
    theme1: ['#FFD1DC', '#FFB6C1', '#FFDEAD', '#FFFACD', '#E0FFFF', '#D8BFD8', '#E6E6FA', '#F5F5DC', '#F0E68C'],
    theme2: ['#013A63', '#01497C', '#014F86', '#2A6F97', '#2C7DA0', '#468FAF', '#61A5C2', '#89C2D9', '#A9D6E5'],
    theme3: ['#98FF98', '#A2F5B0', '#B3F7A8', '#B4F1A8', '#C7E2B0', '#D0F5A0', '#E1FFD1', '#F2FFE6', '#DBF9DB'],
    theme4: ['#FF5E5B', '#FF9A8B', '#FFB48F', '#FFD180', '#FFE888', '#FFFC9E', '#EDE574', '#E5EFA0', '#C6F1E7'],
    theme5: ['#2E4600', '#486B00', '#A2C523', '#7D4427', '#8D9440', '#556B2F', '#5A5C30', '#6B8E23', '#4F4A3A'],
    theme6: ['#F9D423', '#FF4E50', '#FC913A', '#F9D423', '#EDE574', '#FCE38A', '#FC5130', '#E23E57', '#E94E77'],
    theme7: ['#6A0572', '#AB83A1', '#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C', '#9D4EDD', '#E07A5F'],
    theme8: ['#3A6351', '#A0937D', '#D9BF77', '#8D697A', '#9D7265', '#CBBFBB', '#F7F7F7', '#6B4226', '#D4A5A5'],
    theme9: ['#003566', '#004E89', '#006BA6', '#008DCB', '#00A4CC', '#00B2FF', '#005792', '#0074E1', '#72DDF7'],
};

type ScheduleNavigationProp = StackNavigationProp<AppScreensParamList, AppNavigators.SCHEDULE>;

const Schedule: React.FC = function () {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedTheme, setSelectedTheme] = useState<string>('default');
    const themeColors = colorThemes[selectedTheme];
    const navigation = useNavigation<ScheduleNavigationProp>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadSelectedTheme();
            loadCourses();
        });
        loadSelectedTheme();
        loadCourses();
        return unsubscribe;
    }, [navigation]);

    const loadSelectedTheme = async () => {
        try {
            const theme = await SecureStore.getItemAsync('selectedTheme');
            if (theme) {
                setSelectedTheme(theme);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loadCourses = async () => {
        try {
            const coursesData = await SecureStore.getItemAsync('courses');
            if (coursesData) {
                setCourses(JSON.parse(coursesData));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditPress = () => {
        navigation.navigate(AppScreens.EDIT_SCHEDULE, { currentTheme: selectedTheme });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View>
                <View className="flex-row items-center justify-between w-full mb-5 pt-2.5 px-5">
                    <Typography intent="subtitle">My Schedule</Typography>
                    <TouchableOpacity onPress={handleEditPress} className="items-end">
                        <Ionicons name="settings-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <View className="p-2">
                        <Skeleton intent="rounded" width={210} height={60} />
                    </View>
                ) : (
                    <View className="m-0 p-0">
                        <Scheduler courses={courses} colors={themeColors} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Schedule;
