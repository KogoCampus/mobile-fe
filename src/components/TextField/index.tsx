import { cva, VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputKeyPressEventData } from 'react-native';

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
};

const TextField: React.FC<TextFieldProps> = function ({ intent, className, placeholder, onChange, onKeyPress }) {
    const [text, setText] = useState('');
    const [focus, setFocus] = useState(false);
    const [blur, setBlur] = useState(false);
    const [err, setErr] = useState(false);

    const validateDemo = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setText(e.nativeEvent.text);
        onChange(e);
        if (text.length >= 50) {
            setErr(true);
        } else {
            setErr(false);
        }
    };

    const selectIntent = () => {
        if (focus && intent === 'default' && !err) {
            return textField({ intent: 'pressed', className });
        }
        if (blur && intent === 'pressed' && !err) {
            return textField({ intent: 'default', className });
        }
        if (err) {
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
            onChange={validateDemo}
            onKeyPress={onKeyPress}
            className={selectIntent()}
        />
    );
};

export default TextField;

// secureTextEntry <- for password input
