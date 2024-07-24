import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '@components/ui/TextButton';
import DayPicker from './index';

const meta = {
    title: 'DayPicker',
    component: DayPicker,
} satisfies Meta;

export default meta;

type Story = StoryObj;

const DayPickerStory: React.FC = function () {
    const [visible, setVisible] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    return (
        <View className="p-6 space-y-4">
            <TextButton intent="default" size="md" onPress={() => setVisible(true)}>
                Show DayPicker
            </TextButton>
            <DayPicker
                visible={visible}
                onClose={() => setVisible(false)}
                onConfirm={days => {
                    setSelectedDays(days);
                    setVisible(false);
                }}
                selectedDays={selectedDays}
            />
        </View>
    );
};

export const Default: Story = {
    render: () => <DayPickerStory />,
};
