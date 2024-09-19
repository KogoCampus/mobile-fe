import React, { useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Typography from '@components/ui/Typography';
import { AppScreens, AppScreensParamList } from '../../navigation/paramTypes';
import Skeleton from '@components/ui/Skeleton';

const Notification: React.FC = function () {
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.NOTIFICATION_SCREEN>>();

    useEffect(() => {}, []);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between w-full mb-5 px-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="z-10">
                    <AntDesign name="close" size={30} color="black" />
                </TouchableOpacity>
                <View style={{ position: 'absolute', left: 0, right: 0, zIndex: -1 }}>
                    <Typography intent="subtitle" className="text-center">
                        Notification
                    </Typography>
                </View>
            </View>
            <View className="p-2">
                <Skeleton intent="rounded" width={380} height={20} className="mb-2" />
                <Skeleton intent="rounded" width={380} height={20} className="mb-2" />
                <Skeleton intent="rounded" width={380} height={20} className="mb-2" />
                <Skeleton intent="rounded" width={380} height={20} className="mb-2" />
                <Skeleton intent="rounded" width={380} height={20} className="mb-2" />
                <Skeleton intent="rounded" width={380} height={20} className="mb-2" />
                <Skeleton intent="rounded" width={380} height={20} className="mb-2" />
                <Skeleton intent="rounded" width={380} height={20} className="mb-2" />
            </View>
        </SafeAreaView>
    );
};

export default Notification;
