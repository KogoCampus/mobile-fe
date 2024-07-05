import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '.';

const meta = {
    title: 'TextArea',
    component: TextArea,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof TextArea> & { customTextValue: string; className: string }>;

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
            <TextArea intent={intent} className={className} />

            <View className="py-1" />
            <TextArea intent="default" placeholder="default.com" />

            <View className="py-1" />
            <TextArea intent="pressed" placeholder="pressed.com" />

            <View className="py-1" />
            <TextArea intent="disabled" placeholder="disabled.com" />

            <View className="py-1" />
            <TextArea intent="error" placeholder="error.com" />
        </View>
    ),
};
