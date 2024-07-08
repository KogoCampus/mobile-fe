import { NativeSyntheticEvent, TextInputKeyPressEventData, View } from 'react-native';
import TextField from '../TextField';

type searchboxProps = {
    placeholder?: string;
    className?: string;
    onSubmit?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => unknown;
};
const style = 'bg-gray-200 p-2 border-0';

const SearchBox: React.FC<searchboxProps> = function ({ placeholder, className, onSubmit = () => null }) {
    const handleSubmit = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (e.nativeEvent.key === 'Enter') {
            onSubmit(e);
        }
    };

    return (
        <View className={className}>
            <TextField className={style} placeholder={placeholder} onKeyPress={handleSubmit} />
        </View>
    );
};

export default SearchBox;
