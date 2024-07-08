import React from 'react';
import { View, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const scrollableList = cva('', {
    variants: {
        intent: {
            horizontal: 'flex-row',
            vertical: 'flex-col',
        },
    },
    defaultVariants: {
        intent: 'vertical',
    },
});

type ScrollableListProps = VariantProps<typeof scrollableList> & {
    style?: object;
    children: React.ReactNode;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

type ListItemProps = {
    style?: object;
    children: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = function ({ style, children }) {
    return <View style={style}>{children}</View>;
};

const ScrollableList: React.FC<ScrollableListProps> = function ({ style, intent, children, onScroll }) {
    return (
        <View style={style} className={cn(scrollableList({ intent }))}>
            <Animated.FlatList
                data={React.Children.toArray(children)}
                renderItem={({ item, index }) => <View key={index.toString()}>{item}</View>}
                onScroll={onScroll}
                horizontal={intent === 'horizontal'}
            />
        </View>
    );
};

export { ScrollableList, ListItem };
