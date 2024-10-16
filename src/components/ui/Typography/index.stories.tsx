import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import Typography from '.';

const meta = {
    title: 'Typography',
    component: Typography,
} satisfies Meta;

export default meta;

type Story = StoryObj<
    ComponentProps<typeof Typography> & {
        customTextValue: string;
        className: string;
    }
>;

export const Default: Story = {
    args: {
        variant: 'text',
        customTextValue: 'your text here',
    },
    argTypes: {
        variant: {
            options: ['icon', 'subtext', 'text', 'header', 'subtitle', 'title'],
            control: { type: 'radio' },
        },
    },
    render: ({ variant, customTextValue, className }) => (
        <View>
            <Typography variant={variant}>{customTextValue}</Typography>
            <Typography variant="icon" style={{ color: 'blue' }}>
                icon - 0.75rem:12px medium
            </Typography>
            <Typography variant="subtext">subtext - 0.875rem:14px medium</Typography>
            <Typography variant="text">text - 1rem:16px medium</Typography>
            <Typography variant="header">header - 1.25rem:20px medium</Typography>
            <Typography variant="subtitle">subtitle - 1.5rem:24px</Typography>
            <Typography variant="title">title - 2.25rem:36px bold</Typography>
        </View>
    ),
};
