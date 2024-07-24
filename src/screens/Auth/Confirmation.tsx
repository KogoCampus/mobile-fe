import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextButton from '@components/ui/TextButton';
import Typography from '@components/ui/Typography';
import TextField from '@components/ui/TextField';
import { AntDesign } from '@expo/vector-icons';
import { AppNavigators, AppScreens, AppScreensParamList } from '../../navigation/paramTypes';

type ConfirmationNavigationProp = StackNavigationProp<AppScreensParamList, AppNavigators.SIGNIN>;

const Confirmation: React.FC = function () {
    const navigation = useNavigation<ConfirmationNavigationProp>();
    const [code, setCode] = useState('');

    const navigateToNext = () => {
        if (code) {
            navigation.navigate(AppScreens.SETUP_SCREEN);
        }
    };

    const navigateToSignIn = () => {
        navigation.navigate(AppNavigators.SIGNIN);
    };

    return (
        <View className="flex-1 justify-between p-6">
            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-8 left-2 z-10">
                <AntDesign name="left" size={30} color="black" />
            </TouchableOpacity>
            <View className="mt-24">
                <Typography intent="title" className="mb-2">
                    We sent you a confirmation code.
                </Typography>
                <Typography intent="subtext" className="mb-8">
                    Please enter your 6-digit code.
                </Typography>
                <View className="mb-8">
                    <TextField
                        placeholder="Enter your 6-digit code"
                        value={code}
                        onChange={e => setCode(e.nativeEvent.text)}
                        intent="default"
                        className="mb-4"
                    />
                </View>
            </View>
            <View className="items-center mb-8">
                <TextButton intent="default" size="md" onPress={navigateToNext} disabled={!code}>
                    Next
                </TextButton>
                <View className="flex-row items-center mt-4">
                    <Typography intent="text" className="text-sm text-center mr-2">
                        Already have an account?
                    </Typography>
                    <TouchableOpacity onPress={navigateToSignIn}>
                        <Text className="font-bold text-xs text-black underline">Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Confirmation;
