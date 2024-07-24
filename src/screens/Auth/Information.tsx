import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextButton from '@components/ui/TextButton';
import Typography from '@components/ui/Typography';
import { AntDesign } from '@expo/vector-icons';
import { AppNavigators, AppScreensParamList } from '../../navigation/paramTypes';

type InformationScreenNavigationProp = StackNavigationProp<AppScreensParamList, AppNavigators.SIGNIN>;

const Information: React.FC = function () {
    const navigation = useNavigation<InformationScreenNavigationProp>();

    const navigateToSignIn = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: AppNavigators.SIGNIN }],
            }),
        );
    };

    return (
        <View className="flex-1 justify-between p-6">
            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-8 left-2 z-10">
                <AntDesign name="left" size={30} color="black" />
            </TouchableOpacity>
            <View className="mt-24">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Typography intent="title" className="mb-2">
                    Your Information
                </Typography>
                <Typography intent="subtext" className="mb-8">
                    Click one or more keywords that relate to your study.
                </Typography>
            </View>
            <View className="items-center mb-8">
                <TextButton intent="default" size="md" onPress={navigateToSignIn}>
                    Log In
                </TextButton>
            </View>
        </View>
    );
};

export default Information;
