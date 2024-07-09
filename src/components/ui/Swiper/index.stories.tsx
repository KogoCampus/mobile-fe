import React from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import Swiper from './index';

const meta = {
    title: 'Swiper',
    component: Swiper,
} satisfies Meta<typeof Swiper>;

export default meta;

type Story = StoryObj<React.ComponentProps<typeof Swiper>>;

export const Basic: Story = {
    args: {
        direction: 'horizontal',
    },
    render: ({ direction }) => (
        <Swiper direction={direction}>
            <View>
                <Text>Organize your courses, plans, more</Text>
            </View>
            <View>
                <Text>Connect with other students in 20+ Canadian Universities</Text>
            </View>
            <View>
                <Text>Broaden your university life</Text>
            </View>
        </Swiper>
    ),
};
