import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const list = cva('', {
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

type ListProps = VariantProps<typeof list> & {
    children?: React.ReactNode;
    style?: object;
};

type ListItemProps = {
    children?: React.ReactNode;
    style?: object;
};

type ListItemButtonProps = {
    style?: object;
    children?: React.ReactNode;
    onPress?: () => void;
};

type ListItemIconProps = {
    style?: object;
    children?: React.ReactNode;
};

type ListItemTextProps = {
    style?: object;
    primary?: string | React.ReactNode;
    secondary?: string | React.ReactNode;
};

const List: React.FC<ListProps> = function ({ style, intent, children }) {
    return (
        <View style={style} className={cn(list({ intent }))}>
            <FlatList
                data={React.Children.toArray(children)}
                renderItem={({ item, index }) => <View key={index.toString()}>{item}</View>}
                horizontal={intent === 'horizontal'}
            />
        </View>
    );
};

const ListItem: React.FC<ListItemProps> = function ({ style, children }) {
    return <View style={style}>{children}</View>;
};

const ListItemButton: React.FC<ListItemButtonProps> = function ({ style = {}, children, onPress = () => {} }) {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

const ListItemIcon: React.FC<ListItemIconProps> = function ({ style = {}, children }) {
    return <View style={style}>{children}</View>;
};

const ListItemText: React.FC<ListItemTextProps> = function ({ style, primary, secondary }) {
    return (
        <View style={style}>
            {typeof primary === 'string' ? <Text>{primary}</Text> : primary}
            {typeof secondary === 'string' ? <Text>{secondary}</Text> : secondary}
        </View>
    );
};

export { List, ListItem, ListItemButton, ListItemIcon, ListItemText };
