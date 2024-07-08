import { TouchableOpacity } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { useState } from 'react';

import Typography from '../Typography';
import { cn } from '../../../lib/utils';

const textButton = cva(['font-WantedSansMedium', 'rounded-2xl', 'p-3'], {
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

type TextButtonProps = VariantProps<typeof textButton> & {
    children?: string;
    onPress?: () => unknown;
    disabled?: boolean;
    className?: string;
};

const TextButton: React.FC<TextButtonProps> = function ({ intent, size, className, disabled, onPress, children }) {
    const [active, setActive] = useState(false);
    const selectIntent = () => {
        if (active && intent !== 'text') {
            return textButton({ intent: 'pressed', size, className });
        }
        if (disabled) {
            return textButton({ intent: 'disabled', size, className });
        }
        return textButton({ intent, size, className });
    };

    return (
        <TouchableOpacity
            className={cn(selectIntent())}
            disabled={disabled}
            onPressIn={() => setActive(true)}
            onPressOut={() => setActive(false)}
            onPress={onPress}
            activeOpacity={0.8}>
            <Typography
                intent="text"
                className={intent !== 'text' ? 'text-white text-center' : 'text-black text-center'}>
                {children}
            </Typography>
        </TouchableOpacity>
    );
};

export default TextButton;
