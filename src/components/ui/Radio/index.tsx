import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import Typography from '../Typography';
import { cn } from '../../../lib/utils';

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

const circleStyles = cva('w-3 h-3 rounded-full border-2', {
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
    className?: string;
};

const Radio: React.FC<RadioProps> = function ({ label, selected, onPress, className }) {
    return (
        <TouchableOpacity onPress={onPress} className={cn(radioStyles({ selected }), className)}>
            <View className={cn(circleStyles({ selected }))} />
            <Typography intent="subtext" className="ml-1">
                {label}
            </Typography>
        </TouchableOpacity>
    );
};

export default Radio;
