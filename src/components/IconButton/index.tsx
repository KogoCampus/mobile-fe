import { TouchableOpacity } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';

const defaultStyle = ['flex-col', 'justify-center', 'items-center', 'rounded-full'];
const iconButton = cva(defaultStyle, {
    variants: {
        intent: {
            default: ['bg-transparent'],
            filled: ['bg-white', 'shadow'],
            disabled: ['bg-gray-300'],
            pressed: ['bg-gray-400', 'shadow'],
        },
        size: {
            md: ['w-14', 'h-14'],
            sm: ['w-9', 'h-9'],
            xs: ['w-3', 'h-3'],
        },
    },
    defaultVariants: {
        intent: 'default',
        size: 'md',
    },
});

type iconButtonProps = VariantProps<typeof iconButton> & {
    children?: string;
    onPress?: () => unknown;
    disabled?: boolean;
    iconName?: string;
    iconSize?: string;
    iconColor?: string;
    className?: string;
};

const IconButton: React.FC<iconButtonProps> = function ({
    intent,
    size,
    iconName,
    iconColor,
    className,
    disabled,
    onPress,
}) {
    const [active, setActive] = useState(false);

    const selectIntent = () => {
        if (active && intent !== 'default') {
            return iconButton({ intent: 'pressed', size, className });
        }
        if (disabled) {
            return iconButton({ intent: 'disabled', size, className });
        }
        return iconButton({ intent, size, className });
    };

    const setSize = () => {
        if (size === 'xs') {
            return 13;
        }
        if (size === 'sm') {
            return 25;
        }
        if (size === 'md') {
            return 28;
        }
        return 25;
    };

    return (
        <TouchableOpacity
            className={selectIntent()}
            disabled={disabled}
            onPress={onPress}
            onPressIn={() => setActive(true)}
            onPressOut={() => setActive(false)}
            activeOpacity={0.5}>
            <FontAwesome6
                name={iconName}
                size={setSize()}
                color={active && intent !== 'default' ? 'white' : iconColor}
            />
        </TouchableOpacity>
    );
};

export default IconButton;
