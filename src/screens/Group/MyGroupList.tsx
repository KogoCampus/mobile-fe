import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Skeleton from '@components/ui/Skeleton';
import Typography from '@components/ui/Typography';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppScreens, AppScreensParamList } from '@navigation/paramTypes';
import MyGroupListComponent from '@components/feature-groups/MyGroupList';

const MyGroupList = function (): JSX.Element {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.GROUPLIST_SCREEN>>();
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handlePress = () => {
        navigation.navigate(AppScreens.CREATEGROUP_SCREEN);
    };

    const handleGroupPress = () => {
        console.log('Group Pressed');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-5">
                <View className="flex-row items-center justify-between w-full mb-5 pt-2.5">
                    <Typography intent="subtitle">My Groups</Typography>
                    <TouchableOpacity onPress={handlePress} className="items-end">
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <View>
                        <View className="mb-3">
                            <Skeleton intent="rounded" width={350} height={75} />
                        </View>
                        <View className="mb-3">
                            <Skeleton intent="rounded" width={350} height={75} />
                        </View>
                        <View className="mb-3">
                            <Skeleton intent="rounded" width={350} height={75} />
                        </View>
                        <View className="mb-3">
                            <Skeleton intent="rounded" width={350} height={75} />
                        </View>
                    </View>
                ) : (
                    <View>
                        <MyGroupListComponent onGroupPress={handleGroupPress} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default MyGroupList;
