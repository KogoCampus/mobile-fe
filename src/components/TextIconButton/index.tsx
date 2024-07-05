import { TouchableOpacity } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import Typography from '../Typography';

const defaultStyle = ['font-WantedSansMedium', 'rounded-2xl', 'p-3', 'flex-row', 'justify-center', 'items-center'];
const textIconButton = cva(defaultStyle, {
    variants: {
        intent: {
            default: ['bg-black'],
            disabled: ['bg-gray-300'],
            pressed: ['bg-[#50B1EE]'],
            processing: ['bg-black'],
            text: ['bg-transparent'],
        },
        size: {
            md: ['min-w-11', 'w-72', 'py-4'],
            sm: ['min-w-9', 'w-20', 'rounded-3xl', 'py-2'],
        },
    },
    defaultVariants: {
        intent: 'default',
        size: 'md',
    },
});

type TextIconButtonProps = VariantProps<typeof textIconButton> & {
    children?: string;
    onPress?: () => unknown;
    disabled?: boolean;
    iconName?: string;
    iconSize?: string;
    iconColor?: string;
    className?: string;
};

const TextIconButton: React.FC<TextIconButtonProps> = function ({
    intent,
    size,
    iconName,
    iconColor,
    iconSize,
    className,
    disabled,
    onPress,
    children,
}) {
    const [active, setActive] = useState(false);
    const selectIntent = () => {
        if (active && intent !== 'text') {
            return textIconButton({ intent: 'pressed', size, className });
        }
        if (disabled) {
            return textIconButton({ intent: 'disabled', size, className });
        }
        return textIconButton({ intent, size, className });
    };

    const setSize = () => {
        if (iconSize === 'sm') {
            return 13;
        }
        if (iconSize === 'md') {
            return 20;
        }
        return 25;
    };

    return (
        <TouchableOpacity
            className={selectIntent()}
            disabled={disabled}
            onPressIn={() => setActive(true)}
            onPressOut={() => setActive(false)}
            onPress={onPress}
            activeOpacity={0.8}>
            <FontAwesome6 name={iconName} size={setSize()} color={iconColor} />
            <Typography
                intent="text"
                className={intent !== 'text' ? 'text-white text-center pl-1' : 'text-black text-center pl-1'}>
                {children}
            </Typography>
        </TouchableOpacity>
    );
};

export default TextIconButton;
