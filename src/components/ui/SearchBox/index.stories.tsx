import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import SearchBox from '.';

const meta = {
    title: 'SearchBox',
    component: SearchBox,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof SearchBox> & { customTextValue: string; className: string }>;

export const Default: Story = {
    render: ({ className }) => (
        <View>
            <SearchBox className={className} placeholder="search" />
        </View>
    ),
};
