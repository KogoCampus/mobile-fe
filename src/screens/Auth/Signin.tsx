import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextButton from '@components/ui/TextButton';
import Typography from '@components/ui/Typography';
import TextField from '@components/ui/TextField';
import { AppNavigators, AppScreensParamList } from '../../navigation/paramTypes';

type SigninScreenNavigationProp = StackNavigationProp<AppScreensParamList, AppNavigators.SIGNIN>;

const Signin: React.FC = function () {
    const navigation = useNavigation<SigninScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateToHome = () => {
        if (email && password) {
            navigation.navigate(AppNavigators.TABBED_APP);
        }
    };

    const navigateToSignUp = () => {
        navigation.navigate(AppNavigators.SIGNUP);
    };

    return (
        <View className="flex-1 justify-between p-6">
            <View className="mt-24">
                <Typography intent="title" className="mb-2">
                    Welcome Back.
                </Typography>
                <Typography intent="subtext" className="mb-8">
                    Please enter your information
                </Typography>
                <View className="mb-4">
                    <Typography intent="text" className="mb-2">
                        School email
                    </Typography>
                    <TextField
                        placeholder="Enter your school email"
                        value={email}
                        onChange={e => setEmail(e.nativeEvent.text)}
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
                        value={password}
                        onChange={e => setPassword(e.nativeEvent.text)}
                        intent="default"
                    />
                </View>
            </View>
            <View className="items-center mb-8">
                <TextButton intent="default" size="md" onPress={navigateToHome} disabled={!email || !password}>
                    Login
                </TextButton>
                <View className="flex-row items-center mt-4">
                    <Typography intent="text" className="text-sm text-center mr-2">
                        Don&apost have an account?
                    </Typography>
                    <TouchableOpacity onPress={navigateToSignUp}>
                        <Text className="font-bold text-xs text-black underline">Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Signin;
