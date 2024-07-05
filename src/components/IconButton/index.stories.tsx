import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '.';
import Typography from '../Typography';

const meta = {
    title: 'IconButton',
    component: IconButton,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof IconButton> & { customTextValue: string; className: string }>;

export const Default: Story = {
    args: {
        intent: 'default',
        size: 'md',
        iconName: 'chevron-left',
        iconSize: 'md',
        iconColor: 'black',
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
    render: ({ intent, className, iconName, iconColor, iconSize }) => (
        <View className="">
            <View className="py-2 flex-row justify-between items-center">
                <Typography>Custom</Typography>
                <IconButton
                    intent={intent}
                    size="md"
                    className={className}
                    iconName={iconName}
                    iconColor={iconColor}
                    iconSize={iconSize}
                />
            </View>
            <View className="py-2 flex-row justify-between items-center">
                <Typography>md; filled;</Typography>
                <IconButton intent="filled" size="md" iconName="plus" iconColor="black" iconSize="md" />
            </View>
            <View className="py-2 flex-row justify-between items-center">
                <Typography>md; filled; disabled</Typography>
                <IconButton intent="disabled" size="md" disabled iconName="bell" iconColor="black" iconSize="md" />
            </View>
            <View className="py-2 flex-row justify-between items-center">
                <Typography>sm; default;</Typography>
                <IconButton intent="default" size="sm" iconName="bell" iconColor="black" iconSize="sm" />
            </View>
            <View className="py-2 flex-row justify-between items-center">
                <Typography>xs; default;</Typography>
                <IconButton intent="default" size="xs" iconName="caret-down" iconColor="black" iconSize="md" />
            </View>
        </View>
    ),
};
