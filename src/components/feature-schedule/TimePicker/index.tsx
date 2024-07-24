import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Modal } from 'react-native';
import Typography from '@components/ui/Typography';
import TextButton from '@components/ui/TextButton';

interface TimePickerProps {
    visible: boolean;
    onClose: (hour: string, minute: string) => void;
    selectedHour: string;
    selectedMinute: string;
}

/* eslint-disable no-plusplus */
const generateHourOptions = () => {
    const hours = [];
    for (let hour = 7; hour < 21; hour++) {
        const formattedHour = hour.toString().padStart(2, '0');
        hours.push(formattedHour);
    }
    return hours;
};

const generateMinuteOptions = () => {
    const minutes = [];
    for (let minute = 0; minute < 60; minute += 10) {
        const formattedMinute = minute.toString().padStart(2, '0');
        minutes.push(formattedMinute);
    }
    return minutes;
};

const hourOptions = generateHourOptions();
const minuteOptions = generateMinuteOptions();

const TimePicker: React.FC<TimePickerProps> = function ({ visible, onClose, selectedHour, selectedMinute }) {
    const [hour, setHour] = useState(selectedHour);
    const [minute, setMinute] = useState(selectedMinute || '00');

    useEffect(() => {
        if (visible) {
            setHour(selectedHour);
            setMinute(selectedMinute || '00');
        }
    }, [visible, selectedHour, selectedMinute]);

    const handleConfirm = () => {
        onClose(hour, minute);
    };

    return (
        <Modal transparent visible={visible} animationType="slide" onRequestClose={() => onClose(hour, minute)}>
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="w-4/5 bg-white rounded-lg p-5 items-center shadow-lg">
                    <View className="flex-row justify-between items-center w-full mb-5">
                        <Typography intent="header">Select Time</Typography>
                        <TouchableOpacity onPress={() => onClose(hour, minute)} className="p-2">
                            <Typography intent="header">X</Typography>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center w-full">
                        <View className="flex-1 border border-gray-300 rounded-lg p-2 m-2 h-40">
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {hourOptions.map(option => (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => setHour(option)}
                                        className={`py-2 ${option === hour ? 'bg-gray-300' : ''}`}>
                                        <Text className="text-lg text-center">{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <Text className="text-lg">:</Text>
                        <View className="flex-1 border border-gray-300 rounded-lg p-2 m-2 h-40">
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {minuteOptions.map(option => (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => setMinute(option)}
                                        className={`py-2 ${option === minute ? 'bg-gray-300' : ''}`}>
                                        <Text className="text-lg text-center">{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    <TextButton intent="default" size="md" onPress={handleConfirm}>
                        Confirm
                    </TextButton>
                </View>
            </View>
        </Modal>
    );
};

export default TimePicker;
