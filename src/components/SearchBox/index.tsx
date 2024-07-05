import { NativeSyntheticEvent, TextInputChangeEventData, TextInputKeyPressEventData, View } from 'react-native';
import { useState } from 'react';
import TextField from '../TextField';

type searchboxProps = {
    placeholder?: string;
    className?: string;
    onSubmit?: () => unknown;
};
const style = 'bg-gray-200 p-2 border-0';

const SearchBox: React.FC<searchboxProps> = function ({ placeholder, className, onSubmit }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (e.nativeEvent.key === 'Enter') {
            onSubmit(input);
        }
    };

    const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setInput(e.nativeEvent.text);
    };

    return (
        <View className={className}>
            <TextField className={style} placeholder={placeholder} onKeyPress={handleSubmit} onChange={handleInput} />
        </View>
    );
};

export default SearchBox;
