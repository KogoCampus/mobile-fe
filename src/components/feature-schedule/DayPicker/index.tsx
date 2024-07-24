import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { cva } from 'class-variance-authority';
import Typography from '@components/ui/Typography';
import TextButton from '@components/ui/TextButton';
import { cn } from '../../../lib/utils';

interface DayPickerProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (days: string[]) => void;
    selectedDays: string[];
}

const daysOfWeek = [
    { label: 'Monday', value: 'Mon' },
    { label: 'Tuesday', value: 'Tue' },
    { label: 'Wednesday', value: 'Wed' },
    { label: 'Thursday', value: 'Thu' },
    { label: 'Friday', value: 'Fri' },
    { label: 'Saturday', value: 'Sat' },
];

const dayPickerStyles = cva('', {
    variants: {
        selected: {
            true: 'font-bold text-blue-600',
            false: 'text-black',
        },
    },
});

const DayPicker: React.FC<DayPickerProps> = function ({ visible, onClose, onConfirm, selectedDays }) {
    const [selected, setSelected] = useState<string[]>(selectedDays);

    const handleDayPress = (day: string) => {
        setSelected(prevSelected =>
            prevSelected.includes(day) ? prevSelected.filter(d => d !== day) : [...prevSelected, day],
        );
    };

    const handleConfirm = () => {
        onConfirm(selected);
        onClose();
    };

    return (
        <Modal transparent visible={visible} animationType="slide">
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <TouchableWithoutFeedback>
                        <View className="bg-white rounded-lg p-5 w-4/5">
                            <View className="flex-row justify-between items-center mb-2">
                                <Typography intent="header">Select Days</Typography>
                                <TouchableOpacity onPress={onClose} className="p-2">
                                    <Typography intent="header">X</Typography>
                                </TouchableOpacity>
                            </View>
                            {daysOfWeek.map(day => (
                                <TouchableOpacity
                                    key={day.value}
                                    className="py-2 items-center"
                                    onPress={() => handleDayPress(day.value)}>
                                    <Typography
                                        intent="text"
                                        className={cn(dayPickerStyles({ selected: selected.includes(day.value) }))}>
                                        {day.label}
                                    </Typography>
                                </TouchableOpacity>
                            ))}
                            <View className="flex-row justify-center mt-4">
                                <TextButton intent="default" size="md" onPress={handleConfirm}>
                                    Confirm
                                </TextButton>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default DayPicker;
