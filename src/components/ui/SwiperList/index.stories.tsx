import React from 'react';
import { View, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import SwiperListItem, { SwiperListItemProps } from './index';

const meta: Meta<typeof SwiperListItem> = {
    title: 'SwiperListItem',
    component: SwiperListItem,
    decorators: [
        (Story: React.FC): JSX.Element => (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: '#f5fcff',
                }}>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type Story = StoryObj<SwiperListItemProps>;

export const Default: Story = {
    args: {
        onLeavePress: () => Alert.alert('Leave pressed'),
    },
    render: (args: SwiperListItemProps) => (
        <SwiperListItem {...args}>
            <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Item pressed')}>
                <Text style={styles.text}>Group #1</Text>
            </TouchableOpacity>
        </SwiperListItem>
    ),
};

const styles = StyleSheet.create({
    item: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    text: {
        fontSize: 18,
    },
});
