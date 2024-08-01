import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';
import TimePicker from '@components/feature-schedule/TimePicker';
import DayPicker from '@components/feature-schedule/DayPicker';
import TextButton from '@components/ui/TextButton';
import TypePicker from '@components/feature-schedule/TypePicker';
import Typography from '@components/ui/Typography';
import TextField from '@components/ui/TextField';
import { log } from '@lib/utils';
import { AppScreens, AppScreensParamList } from '../../navigation/paramTypes';

interface Session {
    day: string;
    startTime: string;
    endTime: string;
    type: string;
    location: string;
}

const sessionSchema = z
    .object({
        day: z.string().min(1, 'Day of week is required'),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be present'),
        endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be present'),
        type: z.string().min(1, 'Session type is required'),
        location: z.string().min(1, 'Location is required'),
    })
    .refine(
        data => {
            const [startHour, startMinute] = data.startTime.split(':').map(Number);
            const [endHour, endMinute] = data.endTime.split(':').map(Number);
            return endHour > startHour || (endHour === startHour && endMinute > startMinute);
        },
        {
            message: 'End time must be after start time',
            path: ['endTime'],
        },
    );

const courseSchema = z.object({
    courseName: z.string().min(1, 'Course name is required'),
    sessions: z.array(sessionSchema).min(1, 'At least one session is required'),
});

const AddCourse: React.FC = function () {
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.ADD_COURSE>>();

    const [courseName, setCourseName] = useState('');
    const [sessions, setSessions] = useState<Session[]>([
        { day: '', startTime: '', endTime: '', type: '', location: '' },
    ]);
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [dayPickerVisible, setDayPickerVisible] = useState(false);
    const [selectedSession, setSelectedSession] = useState<{ sessionIndex: number; key: string } | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [typeOptions, setTypeOptions] = useState<string[]>(['Lecture', 'Tutorial', 'Lab']);
    const [typePickerVisible, setTypePickerVisible] = useState(false);

    useEffect(() => {
        loadTypeOptions();
    }, []);

    const loadTypeOptions = async () => {
        try {
            const storedOptions = await SecureStore.getItemAsync('typeOptions');
            if (storedOptions) {
                setTypeOptions(JSON.parse(storedOptions));
            }
        } catch (error) {
            log.error(error);
        }
    };

    const saveTypeOptions = async (options: string[]) => {
        try {
            await SecureStore.setItemAsync('typeOptions', JSON.stringify(options));
        } catch (error) {
            log.error(error);
        }
    };

    const handleAddSession = () => {
        setSessions([...sessions, { day: '', startTime: '', endTime: '', type: '', location: '' }]);
    };

    const handleDeleteSession = (index: number) => {
        const updatedSessions = sessions.filter((_, i) => i !== index);
        setSessions(updatedSessions);
    };

    const handleSessionChange = (index: number, key: string, value: string) => {
        const updatedSessions = sessions.map((session, i) => {
            if (i === index) {
                return { ...session, [key]: value };
            }
            return session;
        });
        setSessions(updatedSessions);
    };

    const openTimePicker = (sessionIndex: number, key: string, mode: 'time' | 'day') => {
        setSelectedSession({ sessionIndex, key });
        if (mode === 'time') {
            setTimePickerVisible(true);
        } else {
            setDayPickerVisible(true);
        }
    };

    const handleTimeClose = (hour: string, minute: string) => {
        if (selectedSession) {
            const time = `${hour}:${minute}`;
            handleSessionChange(selectedSession.sessionIndex, selectedSession.key, time);
            setSelectedSession(null);
            setTimePickerVisible(false);
        }
    };

    const handleDayConfirm = (days: string[]) => {
        if (selectedSession) {
            const updatedSessions = sessions
                .map((session, index) => {
                    if (index === selectedSession.sessionIndex) {
                        return days.map(day => ({ ...session, day }));
                    }
                    return [session];
                })
                .flat();
            setSessions(updatedSessions);
            setSelectedSession(null);
            setDayPickerVisible(false);
        }
    };

    const handleTypeChange = (index: number, value: string) => {
        handleSessionChange(index, 'type', value);
        if (!typeOptions.includes(value)) {
            const updatedOptions = [...typeOptions, value];
            setTypeOptions(updatedOptions);
            saveTypeOptions(updatedOptions);
        }
    };

    const handleSavePress = () => {
        const newCourse = {
            courseName,
            sessions,
        };

        try {
            courseSchema.parse(newCourse);
            SecureStore.getItemAsync('courses').then(data => {
                const courses = data ? JSON.parse(data) : [];
                courses.push(newCourse);
                SecureStore.setItemAsync('courses', JSON.stringify(courses)).then(() => {
                    navigation.goBack();
                });
            });
        } catch (e) {
            if (e instanceof z.ZodError) {
                setErrors(e.errors.map(error => error.message));
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center mb-4 px-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                    <AntDesign name="left" size={27} color="black" />
                </TouchableOpacity>
                <Typography intent="header" className="flex-1 text-center">
                    Add a Course
                </Typography>
                <TextButton intent="default" size="sm" onPress={handleSavePress}>
                    Save
                </TextButton>
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                {errors.length > 0 && (
                    <View className="mb-2 bg-red-100 p-2 rounded-md">
                        {errors.map((error, index) => (
                            <Typography key={index} intent="text" className="text-red-700">
                                {error}
                            </Typography>
                        ))}
                    </View>
                )}
                <TextField
                    className="border-b border-gray-300 mb-2 p-2 text-base"
                    value={courseName}
                    onChange={e => setCourseName(e.nativeEvent.text)}
                    placeholder="Course Name"
                />
                {sessions.map((session, index) => (
                    <View key={index} className="mb-2 p-3 bg-gray-200 rounded-md">
                        <TouchableOpacity onPress={() => openTimePicker(index, 'day', 'day')}>
                            <Typography>{session.day || 'Select Day'}</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openTimePicker(index, 'startTime', 'time')}>
                            <Typography>{`Start Time: ${session.startTime || 'Start Time'}`}</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openTimePicker(index, 'endTime', 'time')}>
                            <Typography>{`End Time: ${session.endTime || 'End Time'}`}</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedSession({ sessionIndex: index, key: 'type' });
                                setTypePickerVisible(true);
                            }}
                            className="border-b border-gray-300 mb-2 p-2 text-base bg-white">
                            <Typography>{session.type || 'Session Type'}</Typography>
                        </TouchableOpacity>
                        <TextField
                            className="border-b border-gray-300 mb-2 p-2 text-base bg-white"
                            value={session.location}
                            onChange={e => handleSessionChange(index, 'location', e.nativeEvent.text)}
                            placeholder="Location"
                        />
                        <TouchableOpacity onPress={() => handleDeleteSession(index)} className="self-end mt-2">
                            <FontAwesome name="trash" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity
                    onPress={handleAddSession}
                    className="flex-row justify-center items-center p-3 bg-gray-200 rounded-md">
                    <FontAwesome name="plus" size={20} color="gray" />
                    <Typography className="ml-2 text-gray-600">Add Session</Typography>
                </TouchableOpacity>
            </ScrollView>
            {timePickerVisible && selectedSession && (
                <TimePicker
                    visible={timePickerVisible}
                    onClose={handleTimeClose}
                    selectedHour={
                        selectedSession.key === 'startTime'
                            ? sessions[selectedSession.sessionIndex].startTime.split(':')[0]
                            : sessions[selectedSession.sessionIndex].endTime.split(':')[0]
                    }
                    selectedMinute={
                        selectedSession.key === 'startTime'
                            ? sessions[selectedSession.sessionIndex].startTime.split(':')[1]
                            : sessions[selectedSession.sessionIndex].endTime.split(':')[1]
                    }
                />
            )}
            {dayPickerVisible && selectedSession && (
                <DayPicker
                    visible={dayPickerVisible}
                    onClose={() => setDayPickerVisible(false)}
                    onConfirm={handleDayConfirm}
                    selectedDays={[sessions[selectedSession.sessionIndex].day]}
                />
            )}
            <TypePicker
                visible={typePickerVisible}
                options={typeOptions}
                onSelect={value => {
                    handleTypeChange(selectedSession?.sessionIndex ?? 0, value);
                    setTypePickerVisible(false);
                }}
                onClose={() => setTypePickerVisible(false)}
            />
        </SafeAreaView>
    );
};

export default AddCourse;
