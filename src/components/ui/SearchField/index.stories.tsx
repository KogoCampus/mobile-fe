import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import SearchField from './index';

const meta: Meta<typeof SearchField> = {
    title: 'SearchField',
    component: SearchField,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof SearchField> & { customTextValue: string; className: string }>;

export const Default: Story = {
    args: {
        intent: 'default',
        customTextValue: '',
        className: '',
        placeholder: 'Search...',
    },
    argTypes: {
        intent: {
            options: ['default', 'disabled', 'pressed', 'error'],
            control: { type: 'radio' },
        },
    },
    render: ({ intent, customTextValue, className, placeholder }) => (
        <View>
            <SearchField intent={intent} value={customTextValue} className={className} placeholder={placeholder} />
            <View className="py-3" />
            <SearchField intent="default" value="default" placeholder="Default" />
            <View className="py-1" />
            <SearchField intent="disabled" value="disabled" placeholder="Disabled" />
            <View className="py-1" />
            <SearchField intent="pressed" value="pressed" placeholder="Pressed" />
            <View className="py-1" />
            <SearchField intent="error" value="error" placeholder="Error" />
        </View>
    ),
};
