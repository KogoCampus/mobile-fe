import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './index';

const meta = {
    title: 'Skeleton',
    component: Skeleton,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof Skeleton>>;

export const Default: Story = {
    args: {
        intent: 'text',
        width: 120,
        height: 20,
    },
    argTypes: {
        intent: {
            options: ['text', 'circular', 'rectangular', 'rounded'],
            control: { type: 'radio' },
        },
        width: {
            control: { type: 'number' },
        },
        height: {
            control: { type: 'number' },
        },
    },
    render: ({ intent, width, height, style }) => (
        <View>
            <Skeleton intent={intent} width={width} height={height} style={style} />
            <View className="py-3" />
            <Skeleton intent="text" width={360} height={20} />
            <View className="py-1" />
            <Skeleton intent="circular" width={60} height={60} />
            <View className="py-1" />
            <Skeleton intent="rectangular" width={210} height={118} />
            <View className="py-1" />
            <Skeleton intent="rounded" width={210} height={60} />
        </View>
    ),
};

export const AllVariants: Story = {
    render: () => (
        <View>
            <Skeleton intent="text" width={120} height={20} />
            <View className="py-3" />
            <Skeleton intent="circular" width={60} height={60} />
            <View className="py-1" />
            <Skeleton intent="rectangular" width={210} height={118} />
            <View className="py-1" />
            <Skeleton intent="rounded" width={210} height={60} />
            <View className="py-1" />
            <Skeleton intent="text" width={360} height={20} />
            <View className="py-1" />
            <Skeleton intent="text" width={360} height={20} />
            <View className="py-1" />
            <Skeleton intent="text" width={360} height={20} />
        </View>
    ),
};
