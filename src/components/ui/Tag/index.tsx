import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';

const tagStyles = cva('flex-row items-center px-2 py-1 rounded-full bg-gray-200', {
    variants: {},
});

type TagProps = VariantProps<typeof tagStyles> & {
    children: React.ReactNode;
    style?: ViewStyle;
    className?: string;
    onPress?: () => void;
};

const Tag: React.FC<TagProps> = function ({ children, style, onPress, className }) {
    return (
        <TouchableOpacity onPress={onPress} style={style} className={cn(tagStyles(), className)}>
            <Text>#</Text>
            <Text style={{ marginRight: 5 }}>{children}</Text>
            <AntDesign name="close" size={12} color="black" />
        </TouchableOpacity>
    );
};

export default Tag;
