import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';

const switchStyles = cva('rounded-full w-12 h-6 justify-center px-1', {
    variants: {
        state: {
            on: 'bg-green-500 items-end',
            off: 'bg-gray-500 items-start',
        },
    },
    defaultVariants: {
        state: 'off',
    },
});

const circleStyles = cva('w-5 h-5 rounded-full bg-white', {
    variants: {
        state: {
            on: '',
            off: '',
        },
    },
    defaultVariants: {
        state: 'off',
    },
});

type SwitchProps = VariantProps<typeof switchStyles> & {
    value: boolean;
    onSwitch: () => void;
    style?: object;
};

const Switch: React.FC<SwitchProps> = function ({ value, onSwitch, style }) {
    return (
        <TouchableOpacity
            onPress={onSwitch}
            style={style}
            className={cn(switchStyles({ state: value ? 'on' : 'off' }))}
            testID="switch"
            accessibilityRole="button">
            <View className={cn(circleStyles({ state: value ? 'on' : 'off' }))} testID="switch-circle" />
        </TouchableOpacity>
    );
};

export default Switch;
