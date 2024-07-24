import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { AppScreens, AppScreensParamList } from '../../../navigation/paramTypes';

const screenWidth = Dimensions.get('window').width;
const timeColumnWidth = 50;
const cellHeight = 40;
const hoursOfDay = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

interface Session {
    day: string;
    startTime: string;
    endTime: string;
    type: string;
    location: string;
}

interface Course {
    courseName: string;
    sessions: Session[];
}

interface SchedulerProps {
    courses: Course[];
    colors: string[];
}

const Scheduler: React.FC<SchedulerProps> = function ({ courses, colors = [] }) {
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.SCHEDULE_SCREEN>>();

    const timeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const getColorForCourse = (() => {
        const colorMap: Record<string, string> = {};
        return (courseName: string): string => {
            if (!colorMap[courseName]) {
                const colorIndex = Object.keys(colorMap).length % colors.length;
                colorMap[courseName] = colors[colorIndex] || '#000';
            }
            return colorMap[courseName];
        };
    })();

    const calculateTopOffset = (startTime: string): number => {
        const [startHour, startMinutes] = startTime.split(':').map(Number);
        const startHourIndex = hoursOfDay.indexOf(startHour.toString().padStart(2, '0'));
        return startHourIndex * cellHeight + (startMinutes / 60) * cellHeight;
    };

    const calculateSessionHeight = (startTime: string, endTime: string): number => {
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);
        const durationInMinutes = endMinutes - startMinutes;
        return (durationInMinutes / 60) * cellHeight;
    };

    const renderSessions = (day: string): JSX.Element[] =>
        courses.flatMap(course =>
            course.sessions
                .filter(session => session.day === day)
                .map(session => {
                    const topOffset = calculateTopOffset(session.startTime);
                    const height = calculateSessionHeight(session.startTime, session.endTime);
                    return (
                        <View
                            key={`${day}-${course.courseName}-${session.startTime}-${session.endTime}`}
                            className="absolute left-0 right-0 p-1 justify-center items-center"
                            style={{
                                top: topOffset,
                                height,
                                backgroundColor: getColorForCourse(course.courseName),
                            }}>
                            <Text className="text-center text-sm text-gray-800">{`${course.courseName}\n${session.location}`}</Text>
                        </View>
                    );
                }),
        );

    const hasSaturday = courses.some(course => course.sessions.some(session => session.day === 'Sat'));
    const daysOfWeek = hasSaturday ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const cellWidth = (screenWidth - timeColumnWidth) / daysOfWeek.length;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', paddingBottom: 16 }}>
            <View className="flex-row items-center mb-2" style={{ width: screenWidth }}>
                <View
                    className="h-8 justify-center items-center border border-gray-300 bg-gray-200"
                    style={{ width: timeColumnWidth }}
                />
                {daysOfWeek.map(day => (
                    <View
                        key={day}
                        className="h-8 justify-center items-center border border-gray-300 bg-gray-200"
                        style={{ width: cellWidth }}>
                        <Text className="font-bold">{day}</Text>
                    </View>
                ))}
            </View>
            <View className="flex-row flex-1" style={{ width: screenWidth }}>
                <View className="items-center" style={{ width: timeColumnWidth }}>
                    {hoursOfDay.map(hour => (
                        <View
                            key={hour}
                            className="justify-center items-center border-b border-gray-200"
                            style={{ height: cellHeight, width: timeColumnWidth }}>
                            <Text className="text-xs text-gray-500">{`${hour}:00`}</Text>
                        </View>
                    ))}
                </View>
                <View className="flex-1 flex-row">
                    {daysOfWeek.map(day => (
                        <View key={day} className="relative border-l border-gray-200" style={{ width: cellWidth }}>
                            {renderSessions(day)}
                        </View>
                    ))}
                </View>
            </View>
            <View className="mt-4 px-4">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-bold">Courses</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(AppScreens.EDIT_COURSE, { colorTheme: colors })}>
                        <FontAwesome name="pencil" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                {courses.map(course => (
                    <View
                        key={course.courseName}
                        className="mb-2 p-2 rounded-md"
                        style={{ backgroundColor: getColorForCourse(course.courseName) }}>
                        <Text className="text-lg font-bold mb-1">{course.courseName}</Text>
                        {course.sessions.map((session, index) => (
                            <View key={index} className="mb-1">
                                <Text>{`${session.day}, ${session.startTime} - ${session.endTime}`}</Text>
                                <Text>{session.location}</Text>
                                <Text>{session.type}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Scheduler;
