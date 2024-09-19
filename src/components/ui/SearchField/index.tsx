import React, { useState, useEffect, forwardRef } from 'react';
import {
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TextInputFocusEventData,
    TextInputSubmitEditingEventData,
} from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const defaultStyle = ['font-WantedSansMedium', 'border-b-2', 'bg-transparent', 'w-80', 'align-top', 'p-1'];

const searchField = cva(defaultStyle, {
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

type SearchFieldProps = VariantProps<typeof searchField> & {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
    validate?: (current: string) => boolean;
};

const SearchField = forwardRef<TextInput, SearchFieldProps>(
    (
        {
            intent,
            className,
            placeholder,
            value,
            onChange = () => null,
            onFocus = () => null,
            onSubmitEditing = () => null,
            validate = () => true,
        },
        ref,
    ) => {
        const [text, setText] = useState(value || '');

        useEffect(() => {
            setText(value || '');
        }, [value]);

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

        const onSubmitEditingEvent = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
            onSubmitEditing(e);
        };

        const selectIntent = () => {
            if (focus && intent === 'default' && !hasError) {
                return searchField({ intent: 'pressed', className });
            }
            if (blur && intent === 'pressed' && !hasError) {
                return searchField({ intent: 'default', className });
            }
            if (hasError) {
                return searchField({ intent: 'error', className });
            }
            return searchField({ intent, className });
        };

        return (
            <TextInput
                ref={ref}
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
                onSubmitEditing={onSubmitEditingEvent}
                className={cn(selectIntent())}
            />
        );
    },
);

export default SearchField;
