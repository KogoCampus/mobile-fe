import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import Typography from '.';

const meta = {
    title: 'Typography',
    component: Typography,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof Typography> & { customTextValue: string; className: string }>;

export const Default: Story = {
    args: {
        intent: 'text',
        customTextValue: 'your text here',
        className: '',
    },
    argTypes: {
        intent: {
            options: ['icon', 'subtext', 'text', 'header', 'subtitle', 'title'],
            control: { type: 'radio' },
        },
    },
    render: ({ intent, customTextValue, className }) => (
        <View>
            <Typography intent={intent} className={className}>
                {customTextValue}
            </Typography>
            <View className="py-3" />
            <Typography intent="icon">icon - 0.75rem:12px medium</Typography>
            <View className="py-1" />
            <Typography intent="subtext">subtext - 0.875rem:14px medium</Typography>
            <View className="py-1" />
            <Typography intent="text">text - 1rem:16px medium</Typography>
            <View className="py-1" />
            <Typography intent="header">header - 1.25rem:20px medium</Typography>
            <View className="py-1" />
            <Typography intent="subtitle">subtitle - 1.5rem:24px semibold</Typography>
            <View className="py-1" />
            <Typography intent="title">title - 2.25rem:36px bold</Typography>
        </View>
    ),
};
