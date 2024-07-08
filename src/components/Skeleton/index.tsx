import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const skeleton = cva('bg-gray-300', {
    variants: {
        intent: {
            text: '',
            circular: 'rounded-full',
            rectangular: '',
            rounded: 'rounded-lg',
        },
    },
    defaultVariants: {
        intent: 'text',
    },
});

type SkeletonProps = VariantProps<typeof skeleton> & {
    width: number;
    height: number;
    style?: object;
};

const Skeleton: React.FC<SkeletonProps> = function ({ intent = 'text', width, height, style = {} }) {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    useNativeDriver: true,
                    duration: 800,
                }),
            ]),
        ).start();
    }, [opacity]);

    const baseStyle = {
        width,
        height,
    };

    return <Animated.View style={[baseStyle, style, { opacity }]} className={cn(skeleton({ intent }))} />;
};

export default Skeleton;
