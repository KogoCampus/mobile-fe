import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Scheduler from '@components/feature-schedule/Schedular';
import TextButton from '@components/ui/TextButton';
import Typography from '@components/ui/Typography';
import * as SecureStore from 'expo-secure-store';
import { AppScreens, AppScreensParamList } from '../../navigation/paramTypes';

type ColorTheme =
    | 'default'
    | 'theme1'
    | 'theme2'
    | 'theme3'
    | 'theme4'
    | 'theme5'
    | 'theme6'
    | 'theme7'
    | 'theme8'
    | 'theme9';

const colorThemes: Record<ColorTheme, string[]> = {
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

type EditScheduleNavigationProp = StackNavigationProp<AppScreensParamList, AppScreens.EDIT_SCHEDULE>;
type EditScheduleRouteProp = RouteProp<AppScreensParamList, AppScreens.EDIT_SCHEDULE>;

type EditScheduleProps = {
    navigation: EditScheduleNavigationProp;
    route: EditScheduleRouteProp;
};

const EditSchedule: React.FC<EditScheduleProps> = function ({ navigation, route }) {
    const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(
        (route?.params?.currentTheme as ColorTheme) || 'default',
    );
    const themeColors = colorThemes[selectedTheme];

    useEffect(() => {}, [navigation]);

    const mockCourses = [
        {
            courseName: 'Course 1',
            sessions: [{ day: 'Mon', startTime: '09:00', endTime: '10:00', type: 'LEC', location: '' }],
        },
        {
            courseName: 'Course 2',
            sessions: [{ day: 'Tue', startTime: '10:00', endTime: '12:00', type: 'LEC', location: '' }],
        },
        {
            courseName: 'Course 3',
            sessions: [{ day: 'Wed', startTime: '11:00', endTime: '13:00', type: 'LEC', location: '' }],
        },
        {
            courseName: 'Course 4',
            sessions: [{ day: 'Thu', startTime: '10:00', endTime: '11:00', type: 'LEC', location: '' }],
        },
        {
            courseName: 'Course 5',
            sessions: [{ day: 'Mon', startTime: '12:00', endTime: '13:00', type: 'LEC', location: '' }],
        },
    ];

    const handleThemeSelect = (theme: ColorTheme) => {
        setSelectedTheme(theme);
    };

    const handleSavePress = async () => {
        await SecureStore.setItemAsync('selectedTheme', selectedTheme);
        navigation.navigate(AppScreens.SCHEDULE_SCREEN, { selectedTheme });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center mb-4 px-4">
                <Typography className="flex-1 text-lg font-bold">Edit Schedule</Typography>
                <TextButton intent="default" size="sm" onPress={handleSavePress}>
                    Save
                </TextButton>
            </View>
            <View className="h-1/2">
                <Scheduler courses={mockCourses} colors={themeColors} />
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}>
                <View className="mt-5">
                    <Typography intent="header" className="mb-2">
                        Color Themes
                    </Typography>
                    <FlatList
                        horizontal
                        data={Object.keys(colorThemes)}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item}
                                className={`p-3 mx-1 rounded-md ${
                                    selectedTheme === item ? 'bg-gray-400' : 'bg-gray-200'
                                }`}
                                onPress={() => handleThemeSelect(item as ColorTheme)}>
                                <View className="flex-row flex-wrap w-16 h-16 rounded-md overflow-hidden">
                                    {colorThemes[item as ColorTheme].slice(0, 4).map((color, index) => (
                                        <View key={index} className="w-1/2 h-1/2" style={{ backgroundColor: color }} />
                                    ))}
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditSchedule;
