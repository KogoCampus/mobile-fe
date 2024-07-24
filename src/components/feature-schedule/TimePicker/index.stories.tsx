import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '@components/ui/TextButton';
import TimePicker from './index';

const meta = {
    title: 'TimePicker',
    component: TimePicker,
} satisfies Meta;

export default meta;

type Story = StoryObj;

const TimePickerStory: React.FC = function () {
    const [visible, setVisible] = useState(false);
    const [selectedHour, setSelectedHour] = useState('07');
    const [selectedMinute, setSelectedMinute] = useState('00');

    return (
        <View className="p-6 space-y-4">
            <TextButton intent="default" size="md" onPress={() => setVisible(true)}>
                Show TimePicker
            </TextButton>
            <TimePicker
                visible={visible}
                onClose={(hour, minute) => {
                    setSelectedHour(hour);
                    setSelectedMinute(minute);
                    setVisible(false);
                }}
                selectedHour={selectedHour}
                selectedMinute={selectedMinute}
            />
        </View>
    );
};

export const Default: Story = {
    render: () => <TimePickerStory />,
};
