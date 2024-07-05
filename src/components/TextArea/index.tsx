import { cva, VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from 'react-native';

const defaultStyle = [
    'font-WantedSansMedium',
    'border-2',
    'bg-transparent',
    'w-80',
    'rounded-md',
    'align-top',
    'h-24',
    'p-2',
];

const textArea = cva(defaultStyle, {
    variants: {
        intent: {
            default: ['border-gray-300', 'border-'],
            disabled: ['border-gray-300', 'bg-gray-300'],
            pressed: ['border-black'],
            error: ['border-red-700', 'color-red-700'],
        },
    },
    defaultVariants: {
        intent: 'default',
    },
});

type textAreaProps = VariantProps<typeof textArea> & {
    children?: string;
    placeholder?: string;
    className?: string;
    onChange?: () => unknown;
};

const TextArea: React.FC<textAreaProps> = function ({ intent, className, placeholder, onChange }) {
    const [text, setText] = useState('');
    const [focus, setFocus] = useState(false);
    const [blur, setBlur] = useState(false);
    const [err, setErr] = useState(false);

    const validateDemo = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setText(e.nativeEvent.text);
        onChange(e.nativeEvent.text);
        if (text.length >= 50) {
            setErr(true);
        } else {
            setErr(false);
        }
    };

    const selectIntent = () => {
        if (focus && intent === 'default' && !err) {
            return textArea({ intent: 'pressed', className });
        }
        if (blur && intent === 'pressed' && !err) {
            return textArea({ intent: 'default', className });
        }
        if (err) {
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
            onFocus={() => {
                setBlur(false);
                setFocus(true);
            }}
            onBlur={() => {
                setBlur(true);
                setFocus(false);
            }}
            onChange={validateDemo}
            className={selectIntent()}
        />
    );
};

export default TextArea;

// secureTextEntry <- for password input
