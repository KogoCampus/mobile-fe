import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputProps } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const defaultStyle = [
    'font-WantedSansMedium',
    'border-2',
    'bg-transparent',
    'w-full',
    'rounded-md',
    'align-top',
    'h-24',
    'p-2',
];

const textArea = cva(defaultStyle, {
    variants: {
        intent: {
            default: ['border-gray-300'],
            disabled: ['border-gray-300', 'bg-gray-300'],
            pressed: ['border-black'],
            error: ['border-red-700', 'text-red-700'],
        },
    },
    defaultVariants: {
        intent: 'default',
    },
});

type TextAreaProps = VariantProps<typeof textArea> & {
    value?: string;
    placeholder?: string;
    className?: string;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    onBlur?: TextInputProps['onBlur'];
    onFocus?: TextInputProps['onFocus'];
    onKeyPress?: TextInputProps['onKeyPress'];
    validate?: (current: string) => boolean;
};

const TextArea: React.FC<TextAreaProps> = function ({
    intent,
    className,
    placeholder,
    value = '',
    onChange = () => null,
    onBlur,
    onFocus,
    onKeyPress,
    validate = () => true,
}) {
    const [text, setText] = useState(value);
    const [focus, setFocus] = useState(false);
    const [blur, setBlur] = useState(false);
    const [hasError, toggleError] = useState(false);

    const onChangeEvent = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const newText = e.nativeEvent.text;
        setText(newText);
        if (!validate(newText)) {
            toggleError(true);
        } else {
            toggleError(false);
            onChange(e);
        }
    };

    const selectIntent = () => {
        if (focus && intent === 'default' && !hasError) {
            return textArea({ intent: 'pressed', className });
        }
        if (blur && intent === 'pressed' && !hasError) {
            return textArea({ intent: 'default', className });
        }
        if (hasError) {
            return textArea({ intent: 'error', className });
        }
        return textArea({ intent, className });
    };

    return (
        <TextInput
            multiline
            numberOfLines={4}
            selectTextOnFocus
            placeholder={placeholder}
            editable={intent !== 'disabled'}
            value={text}
            onFocus={e => {
                setBlur(false);
                setFocus(true);
                if (onFocus) onFocus(e);
            }}
            onBlur={e => {
                setBlur(true);
                setFocus(false);
                if (onBlur) onBlur(e);
            }}
            onChange={onChangeEvent}
            onKeyPress={onKeyPress}
            className={cn(selectIntent())}
        />
    );
};

export default TextArea;
