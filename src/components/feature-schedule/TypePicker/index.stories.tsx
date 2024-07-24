import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '@components/ui/TextButton';
import TypePicker from './index';

const meta = {
    title: 'TypePicker',
    component: TypePicker,
} satisfies Meta;

export default meta;

type Story = StoryObj;

const TypePickerStory: React.FC = function () {
    const [visible, setVisible] = useState(false);
    const [, setSelectedType] = useState<string | null>(null);

    return (
        <View className="p-6 space-y-4">
            <TextButton intent="default" size="md" onPress={() => setVisible(true)}>
                Show TypePicker
            </TextButton>
            <TypePicker
                visible={visible}
                options={['Lecture', 'Tutorial', 'Lab']}
                onSelect={type => {
                    setSelectedType(type);
                    setVisible(false);
                }}
                onClose={() => setVisible(false)}
            />
        </View>
    );
};

export const Default: Story = {
    render: () => <TypePickerStory />,
};
