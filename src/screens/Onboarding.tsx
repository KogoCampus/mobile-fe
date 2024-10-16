import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Swiper from '@components/ui/Swiper';
import TextButton from '@components/ui/TextButton';
import Typography from '@components/ui/Typography';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigators, AppScreensParamList } from '../navigation/paramTypes';

type SplashScreenNavigationProp = StackNavigationProp<AppScreensParamList, AppNavigators.ONBOARDING>;

function SplashScreen(): JSX.Element {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    const navigateToSignup = () => {
        navigation.navigate(AppNavigators.SIGNUP);
    };

    const navigateToSignIn = () => {
        navigation.navigate(AppNavigators.SIGNIN);
    };
    /* eslint-disable global-require */
    return (
        <Swiper direction="horizontal">
            <View className="flex-1 justify-center items-center bg-white">
                <Image className="w-4/5 h-1/3 resize-contain" source={require('@assets/images/Onboarding_1.png')} />
                <Typography intent="text" className="text-base text-center px-5">
                    Organize your courses, plans, more
                </Typography>
            </View>
            <View className="flex-1 justify-center items-center bg-white">
                <Image className="w-4/5 h-1/3 resize-contain" source={require('@assets/images/Onboarding_2.png')} />
                <Typography intent="text" className="text-base text-center px-5">
                    Connect with other students in {'\n'}20+ Canadian Universities
                </Typography>
            </View>
            <View className="flex-1 justify-center items-center bg-white">
                <Image className="w-4/5 h-1/3 resize-contain" source={require('@assets/images/Onboarding_3.png')} />
                <Typography intent="text" className="text-base text-center px-5 mb-4">
                    Broaden your university life
                </Typography>
                <View className="w-full items-center">
                    <TextButton intent="default" size="md" onPress={navigateToSignup} className="mb-4">
                        Get Started
                    </TextButton>
                    <View className="flex-row items-center">
                        <Typography intent="text" className="text-sm text-center mr-2">
                            Already have an account?
                        </Typography>
                        <TouchableOpacity onPress={navigateToSignIn}>
                            <Text className="font-bold text-xs text-black underline">Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Swiper>
    );
}

export default SplashScreen;
