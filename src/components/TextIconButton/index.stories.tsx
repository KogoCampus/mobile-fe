import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import TextIconButton from '.';

const meta = {
    title: 'TextIconButton',
    component: TextIconButton,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof TextIconButton> & { customTextValue: string; className: string }>;

export const Default: Story = {
    args: {
        intent: 'default',
        size: 'md',
        iconName: 'at',
        iconSize: 'md',
        iconColor: 'white',
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
    render: ({ intent, customTextValue, className, iconName, iconColor, iconSize }) => (
        <View>
            <TextIconButton
                intent={intent}
                size="md"
                className={className}
                iconName={iconName}
                iconColor={iconColor}
                iconSize={iconSize}>
                {customTextValue}
            </TextIconButton>
            <View className="py-1" />
            <TextIconButton intent="default" size="md" iconName="plus" iconColor="white" iconSize="md">
                Add
            </TextIconButton>
            <View className="py-1" />
            <TextIconButton intent="default" size="md" disabled iconName="bell" iconColor="white" iconSize="md">
                disabled
            </TextIconButton>
            <View className="py-1" />
            <TextIconButton intent="default" size="sm" iconName="plus" iconColor="white" iconSize="sm">
                done
            </TextIconButton>
            <View className="py-1" />
            <TextIconButton intent="text" size="sm" iconName="caret-down" iconColor="black" iconSize="md">
                report
            </TextIconButton>
        </View>
    ),
};
