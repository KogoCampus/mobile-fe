import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '.';

const meta = {
    title: 'TextButton',
    component: TextButton,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof TextButton> & { customTextValue: string; className: string }>;

export const Default: Story = {
    args: {
        intent: 'default',
        size: 'md',
        customTextValue: 'Sign up',
        className: '',
    },
    argTypes: {
        intent: {
            options: ['default', 'pressed', 'processing'],
            control: { type: 'radio' },
        },
        size: {
            options: ['md', 'sm'],
            control: { type: 'radio' },
        },
    },
    render: ({ intent, customTextValue, className }) => (
        <View>
            <TextButton intent={intent} size="md" className={className}>
                {customTextValue}
            </TextButton>
            <View className="py-1" />
            <TextButton intent="default" size="md">
                Sign up
            </TextButton>
            <View className="py-1" />
            <TextButton intent="default" size="md" disabled>
                disabled - md
            </TextButton>
            <View className="py-1" />
            <TextButton intent="default" size="sm">
                done
            </TextButton>
            <View className="py-1" />
            <TextButton intent="text" size="sm">
                report
            </TextButton>
            <View className="py-1" />
            <TextButton intent="text" size="sm">
                report
            </TextButton>
        </View>
    ),
};
