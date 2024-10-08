import React, { useState } from 'react';
import {
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TextInputKeyPressEventData,
    TextInputFocusEventData,
} from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const defaultStyle = ['font-WantedSansMedium', 'border-b-2', 'bg-transparent', 'w-80', 'align-top', 'p-1'];

const textField = cva(defaultStyle, {
    variants: {
        intent: {
            default: ['border-gray-300'],
            disabled: ['border-gray-300', 'bg-gray-300'],
            pressed: ['border-black'],
            error: ['border-red-700', 'color-red-700'],
        },
    },
    defaultVariants: {
        intent: 'default',
    },
});

type TextFieldProps = VariantProps<typeof textField> & {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
    validate?: (current: string) => boolean;
};

const TextField: React.FC<TextFieldProps> = function ({
    intent,
    className,
    placeholder,
    value,
    onChange = () => null,
    onFocus = () => null,
    onKeyPress = () => null,
    validate = () => true,
}) {
    const [text, setText] = useState(value || '');
    const [focus, setFocus] = useState(false);
    const [blur, setBlur] = useState(false);
    const [hasError, toggleError] = useState(false);

    const onChangeEvent = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setText(e.nativeEvent.text);
        if (!validate(e.nativeEvent.text)) {
            toggleError(true);
        } else {
            toggleError(false);
            onChange(e);
        }
    };

    const onFocusEvent = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setBlur(false);
        setFocus(true);
        onFocus(e);
    };

    const selectIntent = () => {
        if (focus && intent === 'default' && !hasError) {
            return textField({ intent: 'pressed', className });
        }
        if (blur && intent === 'pressed' && !hasError) {
            return textField({ intent: 'default', className });
        }
        if (hasError) {
            return textField({ intent: 'error', className });
        }
        return textField({ intent, className });
    };

    return (
        <TextInput
            selectTextOnFocus
            placeholder={placeholder}
            editable={intent !== 'disabled'}
            value={text}
            onFocus={onFocusEvent}
            onBlur={() => {
                setBlur(true);
                setFocus(false);
            }}
            onChange={onChangeEvent}
            onKeyPress={onKeyPress}
            className={cn(selectIntent())}
        />
    );
};

export default TextField;
// secureTextEntry <- for password input
