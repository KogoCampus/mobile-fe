import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import Tag from './index';

const meta = {
    title: 'Tag',
    component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<ComponentProps<typeof Tag> & { customTextValue: string; className: string }>;

export const Default: Story = {
    args: {
        customTextValue: 'ExTag',
        className: '',
    },
    render: ({ customTextValue, className, onPress }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Tag onPress={onPress}>{customTextValue}</Tag>
        </View>
    ),
};
