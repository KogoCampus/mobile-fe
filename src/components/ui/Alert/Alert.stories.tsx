import React from 'react';
import { View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react';
import Alert from './index';
import { AlertProvider, useAlert } from './AlertContext';
import TextButton from '../TextButton';

const meta: Meta = {
    title: 'Alert',
    component: Alert,
    decorators: [
        Story => (
            <AlertProvider>
                <Story />
            </AlertProvider>
        ),
    ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

const AlertButtons: React.FC = function () {
    const { showAlert } = useAlert();

    return (
        <View className="p-6 space-y-4">
            <TextButton intent="default" size="sm" onPress={() => showAlert('기모찌!', { type: 'success' })}>
                성공 !
            </TextButton>
            <TextButton intent="default" size="sm" onPress={() => showAlert('안 기모찌...', { type: 'error' })}>
                에러 ㅠ
            </TextButton>
            <TextButton intent="default" size="sm" onPress={() => showAlert('기모찌..?', { type: 'info' })}>
                인포?
            </TextButton>
            <TextButton intent="default" size="sm" onPress={() => showAlert('약간 안 기모찌', { type: 'warning' })}>
                워닝 :(
            </TextButton>
        </View>
    );
};

export const Default: Story = {
    render: () => <AlertButtons />,
};
