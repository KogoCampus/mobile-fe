import { ComponentProps, useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import Switch from './index';

const meta = {
    title: 'Switch',
    component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<ComponentProps<typeof Switch> & { className: string }>;

const SwitchStory: React.FC<ComponentProps<typeof Switch> & { className: string }> = function ({ value, className }) {
    const [switchValue, setSwitchValue] = useState(value);
    const handleSwitch = () => setSwitchValue(!switchValue);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Switch value={switchValue} onSwitch={handleSwitch} />
        </View>
    );
};

export const Default: Story = {
    args: {
        value: false,
        className: '',
    },
    argTypes: {
        value: {
            control: { type: 'boolean' },
        },
    },
    render: args => <SwitchStory {...args} />,
};
