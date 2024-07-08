import React from 'react';
import { TouchableOpacity, View, Text, ViewStyle } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const radioStyles = cva('flex-row items-center', {
    variants: {
        selected: {
            true: '',
            false: '',
        },
    },
    defaultVariants: {
        selected: false,
    },
});

const circleStyles = cva('w-4 h-4 rounded-full border-2', {
    variants: {
        selected: {
            true: 'border-green-500 bg-green-500',
            false: 'border-gray-500 bg-white',
        },
    },
    defaultVariants: {
        selected: false,
    },
});

type RadioProps = VariantProps<typeof radioStyles> & {
    label: string;
    selected: boolean;
    onPress: () => void;
    style?: ViewStyle;
};

const Radio: React.FC<RadioProps> = function ({ label, selected, onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={style} className={cn(radioStyles({ selected }))}>
            <View className={cn(circleStyles({ selected }))} />
            <Text style={{ marginLeft: 5 }}>{label}</Text>
        </TouchableOpacity>
    );
};

export default Radio;
