import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import TextField from '.';

const meta = {
    title: 'TextField',
    component: TextField,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof TextField> & { customTextValue: string; className: string }>;

export const Default: Story = {
    args: {
        intent: 'default',
        className: '',
    },
    argTypes: {
        intent: {
            options: ['default', 'disabled', 'pressed', 'error'],
            control: { type: 'radio' },
        },
    },
    render: ({ intent, className }) => (
        <View>
            <TextField intent={intent} className={className} />

            <View className="py-1" />
            <TextField intent="default" placeholder="default.com" />

            <View className="py-1" />
            <TextField intent="pressed" placeholder="pressed.com" />

            <View className="py-1" />
            <TextField intent="disabled" placeholder="disabled.com" />

            <View className="py-1" />
            <TextField intent="error" placeholder="error.com" />
        </View>
    ),
};
