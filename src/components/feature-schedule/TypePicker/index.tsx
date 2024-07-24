import React, { useState } from 'react';
import { View, Modal, FlatList } from 'react-native';
import { cva } from 'class-variance-authority';
import TextButton from '@components/ui/TextButton';
import TextField from '@components/ui/TextField';
import Typography from '@components/ui/Typography';
import { cn } from '../../../lib/utils';

interface TypePickerModalProps {
    visible: boolean;
    options: string[];
    onSelect: (type: string) => void;
    onClose: () => void;
}

const typePickerStyles = cva('p-2 text-lg', {
    variants: {
        selected: {
            true: 'bg-gray-300',
            false: '',
        },
    },
});

const TypePicker: React.FC<TypePickerModalProps> = function ({ visible, options, onSelect, onClose }) {
    const [customType, setCustomType] = useState('');

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
                <View className="w-4/5 bg-white p-5 rounded-lg items-center">
                    <Typography intent="header" className="mb-5">
                        Select Session Type
                    </Typography>
                    <FlatList
                        data={options}
                        renderItem={({ item }) => (
                            <TextButton
                                intent="default"
                                size="sm"
                                className={cn('my-1 w-full items-center', typePickerStyles({ selected: false }))}
                                onPress={() => onSelect(item)}>
                                {item}
                            </TextButton>
                        )}
                        keyExtractor={item => item}
                    />
                    <TextField
                        placeholder="Custom Type"
                        className="mb-2 w-full"
                        value={customType}
                        onChange={e => setCustomType(e.nativeEvent.text)}
                    />
                    <TextButton
                        intent="default"
                        size="md"
                        onPress={() => {
                            if (customType.trim()) {
                                onSelect(customType.trim());
                                setCustomType('');
                            }
                        }}>
                        Add Custom Type
                    </TextButton>
                    <TextButton intent="default" size="sm" onPress={onClose}>
                        Close
                    </TextButton>
                </View>
            </View>
        </Modal>
    );
};

export default TypePicker;
