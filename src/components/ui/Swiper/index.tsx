import React, { useState, useRef } from 'react';
import { View, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';

const swiperStyles = cva('flex-1', {
    variants: {
        direction: {
            horizontal: 'flex-row',
            vertical: 'flex-col',
        },
    },
    defaultVariants: {
        direction: 'horizontal',
    },
});

const dotStyles = cva('w-2 h-2 rounded-full mx-1', {
    variants: {
        active: {
            true: 'bg-black',
            false: 'bg-stone-200',
        },
    },
    defaultVariants: {
        active: false,
    },
});

const paginationStyles = cva('absolute bottom-5 left-0 right-0 flex-row justify-center');

type SwiperProps = VariantProps<typeof swiperStyles> & {
    children: React.ReactNode;
    style?: object;
    onIndexChanged?: (index: number) => void;
};

const Swiper: React.FC<SwiperProps> = function ({ children, direction, style, onIndexChanged }) {
    const scrollViewRef = useRef<ScrollView>(null);
    const { width, height } = Dimensions.get('window');
    const [index, setIndex] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset } = event.nativeEvent;
        const newIndex =
            direction === 'horizontal' ? Math.floor(contentOffset.x / width) : Math.floor(contentOffset.y / height);
        if (newIndex !== index) {
            setIndex(newIndex);
            if (onIndexChanged) {
                onIndexChanged(newIndex);
            }
        }
    };

    return (
        <View style={[{ flex: 1 }, style]} className={cn(swiperStyles({ direction }))}>
            <ScrollView
                ref={scrollViewRef}
                horizontal={direction === 'horizontal'}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                testID="swiper-scroll-view">
                {React.Children.map(children, (child, i) => (
                    <View style={{ width, height }} key={i}>
                        {child}
                    </View>
                ))}
            </ScrollView>
            <View className={cn(paginationStyles())}>
                {React.Children.map(children, (_, i) => (
                    <View key={i} className={cn(dotStyles({ active: i === index }))} />
                ))}
            </View>
        </View>
    );
};

export default Swiper;
