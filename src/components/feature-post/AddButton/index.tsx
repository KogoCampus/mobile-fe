import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppScreens, AppScreensParamList } from '@navigation/paramTypes';
import { StackNavigationProp } from '@react-navigation/stack';

const AddButton: React.FC = function () {
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.CREATEPOST_SCREEN>>();

    const handlePress = () => {
        navigation.navigate(AppScreens.CREATEPOST_SCREEN);
    };

    return (
        <TouchableOpacity
            className="absolute bottom-5 right-5 w-16 h-16 rounded-full bg-white justify-center items-center shadow-lg"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
                elevation: 5,
            }}
            onPress={handlePress}>
            <Text className="text-4xl text-black">+</Text>
        </TouchableOpacity>
    );
};

export default AddButton;
