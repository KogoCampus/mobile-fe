import { cva, VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputKeyPressEventData } from 'react-native';

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
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
    validate?: (current: string) => boolean;
};

const TextField: React.FC<TextFieldProps> = function ({
    intent,
    className,
    placeholder,
    onChange = () => null,
    onKeyPress = () => null,
    validate = () => true,
}) {
    const [text, setText] = useState('');
    const [focus, setFocus] = useState(false);
    const [blur, setBlur] = useState(false);
    const [hasError, toggerError] = useState(false);

    const onChangeEvent = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setText(e.nativeEvent.text);
        if (!validate(text)) {
            toggerError(true);
        } else {
            toggerError(false);
            onChange(e);
        }
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
            onFocus={() => {
                setBlur(false);
                setFocus(true);
            }}
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
