import React, { useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Typography from '@components/ui/Typography';
import { AppScreens, AppScreensParamList } from '../../navigation/paramTypes';
import TextButton from '@components/ui/TextButton';
import Select from '@components/ui/Select';
import TextArea from '@components/ui/TextArea';

const Support: React.FC = function () {
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.SUPPORT_SCREEN>>();

    const handleSavePress = () => {};

    useEffect(() => {}, []);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between w-full mb-5 px-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="z-10">
                    <AntDesign name="close" size={30} color="black" />
                </TouchableOpacity>
                <View className="absolute left-0 right-0 z-0 flex-row justify-center">
                    <Typography intent="subtitle" className="text-center">
                        Report
                    </Typography>
                </View>
                <TextButton intent="default" size="sm" onPress={handleSavePress} className="z-10">
                    Submit
                </TextButton>
            </View>
            <View className="p-4">
                <Select
                    intent="lg"
                    placeholder="Select Reason"
                    options={['Option 1', 'Option 2', 'Option 3']}
                    className="z-10"
                />
                <View className="mt-4">
                    <TextArea intent="default" placeholder="Description" className="z-0" />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Support;
