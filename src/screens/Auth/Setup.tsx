import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextButton from '@components/ui/TextButton';
import Typography from '@components/ui/Typography';
import TextField from '@components/ui/TextField';
import { z } from 'zod';
import { AntDesign } from '@expo/vector-icons';
import { AppNavigators, AppScreens, AppScreensParamList } from '../../navigation/paramTypes';

type SetupScreenNavigationProp = StackNavigationProp<AppScreensParamList, AppNavigators.SIGNIN>;

const Setup: React.FC = function () {
    const navigation = useNavigation<SetupScreenNavigationProp>();
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const passwordSchema = z
        .string()
        .min(8, '8-15 letters')
        .max(15, '8-15 letters')
        .regex(/[^A-Za-z0-9]/, 'At least one special character')
        .regex(/[A-Z]/, 'At least one upper case letter')
        .regex(/[0-9]/, 'At least one number');

    const validatePassword = (password: string) => {
        const result = passwordSchema.safeParse(password);
        if (!result.success) {
            const newErrors = result.error.errors.map(e => e.message);
            setErrors(newErrors);
        } else {
            setErrors([]);
        }
    };

    const navigateToNext = () => {
        if (username && !errors.length) {
            navigation.navigate(AppScreens.INFO_SCREEN);
        }
    };

    return (
        <View className="flex-1 justify-between p-6">
            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-8 left-2 z-10">
                <AntDesign name="left" size={30} color="black" />
            </TouchableOpacity>
            <View className="mt-24">
                <Typography intent="title" className="mb-2">
                    Set up your account
                </Typography>
                <Typography intent="subtext" className="mb-8">
                    Please enter the following
                </Typography>
                <View className="mb-4">
                    <Typography intent="text" className="mb-2">
                        Username
                    </Typography>
                    <TextField
                        placeholder="Enter your username"
                        value={username}
                        onChange={e => setUsername(e.nativeEvent.text)}
                        intent="default"
                        className="mb-4"
                    />
                </View>
                <View className="mb-8">
                    <Typography intent="text" className="mb-2">
                        Password
                    </Typography>
                    <TextField
                        placeholder="Enter your password"
                        value={userPassword}
                        onChange={e => {
                            setUserPassword(e.nativeEvent.text);
                            validatePassword(e.nativeEvent.text);
                        }}
                        intent="default"
                    />
                </View>
                {errors.length > 0 && (
                    <View className="mb-4">
                        {errors.map((error, index) => (
                            <Typography key={index} intent="text" className="text-black">
                                {error}
                            </Typography>
                        ))}
                    </View>
                )}
            </View>
            <View className="items-center mb-8">
                <TextButton
                    intent="default"
                    size="md"
                    onPress={navigateToNext}
                    disabled={!username || !userPassword || errors.length > 0}>
                    Next
                </TextButton>
            </View>
        </View>
    );
};

export default Setup;
