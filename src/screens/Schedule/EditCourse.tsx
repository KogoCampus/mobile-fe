import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import TimePicker from '@components/feature-schedule/TimePicker';
import DayPicker from '@components/feature-schedule/DayPicker';
import TextButton from '@components/ui/TextButton';
import TypePicker from '@components/feature-schedule/TypePicker';
import Typography from '@components/ui/Typography';
import TextField from '@components/ui/TextField';
import { AppScreens, AppScreensParamList } from '../../navigation/paramTypes';

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

type EditCourseRouteProp = RouteProp<AppScreensParamList, AppScreens.EDIT_COURSE>;

const EditCourse: React.FC = function () {
    const route = useRoute<EditCourseRouteProp>();
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.EDIT_COURSE>>();
    const [courses, setCourses] = useState<Course[]>([]);
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [dayPickerVisible, setDayPickerVisible] = useState(false);
    const [typePickerVisible, setTypePickerVisible] = useState(false);
    const [selectedSession, setSelectedSession] = useState<{
        courseIndex: number;
        sessionIndex: number;
        key: string;
    } | null>(null);
    const colors = route.params.colorTheme;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadCourses);
        loadCourses();
        return unsubscribe;
    }, [navigation]);

    const loadCourses = async () => {
        try {
            const coursesData = await SecureStore.getItemAsync('courses');
            if (coursesData) {
                setCourses(JSON.parse(coursesData));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveCourses = async () => {
        try {
            await SecureStore.setItemAsync('courses', JSON.stringify(courses));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSavePress = async () => {
        await saveCourses();
        navigation.goBack();
    };

    const handleAddCourse = () => {
        navigation.navigate(AppScreens.ADD_COURSE, { colorTheme: colors });
    };

    const handleDeleteCourse = (index: number) => {
        const updatedCourses = courses.filter((_, i) => i !== index);
        setCourses(updatedCourses);
    };

    const handleCourseChange = (index: number, key: string, value: string) => {
        const updatedCourses = courses.map((course, i) => {
            if (i === index) {
                return { ...course, [key]: value };
            }
            return course;
        });
        setCourses(updatedCourses);
    };

    const handleSessionChange = (courseIndex: number, sessionIndex: number, key: string, value: string) => {
        const updatedCourses = courses.map((course, i) => {
            if (i === courseIndex) {
                const updatedSessions = course.sessions.map((session, j) => {
                    if (j === sessionIndex) {
                        return { ...session, [key]: value };
                    }
                    return session;
                });
                return { ...course, sessions: updatedSessions };
            }
            return course;
        });
        setCourses(updatedCourses);
    };

    const openTimePicker = (courseIndex: number, sessionIndex: number, key: string) => {
        setSelectedSession({ courseIndex, sessionIndex, key });
        setTimePickerVisible(true);
    };

    const openDayPicker = (courseIndex: number, sessionIndex: number) => {
        setSelectedSession({ courseIndex, sessionIndex, key: 'day' });
        setDayPickerVisible(true);
    };

    const openTypePicker = (courseIndex: number, sessionIndex: number) => {
        setSelectedSession({ courseIndex, sessionIndex, key: 'type' });
        setTypePickerVisible(true);
    };

    const handleTimeClose = (hour: string, minute: string) => {
        if (selectedSession) {
            const time = `${hour}:${minute}`;
            handleSessionChange(selectedSession.courseIndex, selectedSession.sessionIndex, selectedSession.key, time);
            setSelectedSession(null);
            setTimePickerVisible(false);
        }
    };

    const handleDayConfirm = (days: string[]) => {
        if (selectedSession) {
            const updatedCourses = courses.map((course, courseIndex) => {
                if (courseIndex === selectedSession.courseIndex) {
                    const updatedSessions = course.sessions
                        .map((session, sessionIndex) => {
                            if (sessionIndex === selectedSession.sessionIndex) {
                                return days.map(day => ({ ...session, day }));
                            }
                            return [session];
                        })
                        .flat();
                    return { ...course, sessions: updatedSessions };
                }
                return course;
            });
            setCourses(updatedCourses);
            setSelectedSession(null);
            setDayPickerVisible(false);
        }
    };

    const handleTypeSelect = (type: string) => {
        if (selectedSession) {
            handleSessionChange(selectedSession.courseIndex, selectedSession.sessionIndex, 'type', type);
            setSelectedSession(null);
            setTypePickerVisible(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center mb-4 px-4">
                <Typography className="flex-1 text-lg font-bold">Edit Courses</Typography>
                <TextButton intent="default" size="sm" onPress={handleSavePress}>
                    Save
                </TextButton>
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}>
                {courses.map((course, courseIndex) => (
                    <View
                        key={courseIndex}
                        className="mb-2 p-3 rounded-md"
                        style={{ backgroundColor: colors[courseIndex % colors.length] }}>
                        <TextField
                            className="border-b border-gray-300 mb-2 p-2 text-base"
                            value={course.courseName}
                            onChange={e => handleCourseChange(courseIndex, 'courseName', e.nativeEvent.text)}
                            placeholder="Course Name"
                        />
                        {course.sessions.map((session, sessionIndex) => (
                            <View key={sessionIndex} className="mb-2 p-3 border-b border-gray-300">
                                <TouchableOpacity onPress={() => openDayPicker(courseIndex, sessionIndex)}>
                                    <Typography>{session.day || 'Select Day'}</Typography>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => openTimePicker(courseIndex, sessionIndex, 'startTime')}>
                                    <Typography>{session.startTime || 'Select Start Time'}</Typography>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openTimePicker(courseIndex, sessionIndex, 'endTime')}>
                                    <Typography>{session.endTime || 'Select End Time'}</Typography>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openTypePicker(courseIndex, sessionIndex)}>
                                    <Typography>{session.type || 'Select Type'}</Typography>
                                </TouchableOpacity>
                                <TextField
                                    className="border-b border-gray-300 mb-2 p-2 text-base"
                                    value={session.location}
                                    onChange={e =>
                                        handleSessionChange(courseIndex, sessionIndex, 'location', e.nativeEvent.text)
                                    }
                                    placeholder="Location"
                                />
                                <TouchableOpacity
                                    onPress={() => handleDeleteCourse(courseIndex)}
                                    className="self-end mt-2">
                                    <FontAwesome name="trash" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ))}
                <TouchableOpacity
                    onPress={handleAddCourse}
                    className="flex-row justify-center items-center p-3 bg-gray-200 rounded-md">
                    <FontAwesome name="plus" size={20} color="gray" />
                    <Typography className="ml-2 text-gray-600">Add a Course</Typography>
                </TouchableOpacity>
            </ScrollView>
            {timePickerVisible && selectedSession && (
                <TimePicker
                    visible={timePickerVisible}
                    onClose={handleTimeClose}
                    selectedHour={
                        selectedSession.key === 'startTime'
                            ? courses[selectedSession.courseIndex].sessions[
                                  selectedSession.sessionIndex
                              ].startTime.split(':')[0]
                            : courses[selectedSession.courseIndex].sessions[selectedSession.sessionIndex].endTime.split(
                                  ':',
                              )[0]
                    }
                    selectedMinute={
                        selectedSession.key === 'startTime'
                            ? courses[selectedSession.courseIndex].sessions[
                                  selectedSession.sessionIndex
                              ].startTime.split(':')[1]
                            : courses[selectedSession.courseIndex].sessions[selectedSession.sessionIndex].endTime.split(
                                  ':',
                              )[1]
                    }
                />
            )}
            {dayPickerVisible && selectedSession && (
                <DayPicker
                    visible={dayPickerVisible}
                    onClose={() => setDayPickerVisible(false)}
                    onConfirm={handleDayConfirm}
                    selectedDays={[courses[selectedSession.courseIndex].sessions[selectedSession.sessionIndex].day]}
                />
            )}
            {typePickerVisible && selectedSession && (
                <TypePicker
                    visible={typePickerVisible}
                    onSelect={handleTypeSelect}
                    onClose={() => setTypePickerVisible(false)}
                    options={['Lecture', 'Tutorial', 'Lab']}
                />
            )}
        </SafeAreaView>
    );
};

export default EditCourse;
