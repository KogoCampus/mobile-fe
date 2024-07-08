import { ComponentProps, useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import Radio from './index';

const meta = {
    title: 'Radio',
    component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<ComponentProps<typeof Radio> & { customLabel: string; className: string }>;

const RadioStory: React.FC<ComponentProps<typeof Radio> & { customLabel: string; className: string }> = function ({
    customLabel,
    selected,
}) {
    const [isSelected, setIsSelected] = useState(selected);
    const handlePress = () => setIsSelected(!isSelected);

    return (
        <View>
            <Radio label={customLabel} selected={isSelected} onPress={handlePress} />
        </View>
    );
};

export const Default: Story = {
    args: {
        customLabel: 'Example Label',
        selected: false,
        className: '',
    },
    argTypes: {
        selected: {
            control: { type: 'boolean' },
        },
    },
    render: args => <RadioStory {...args} />,
};
