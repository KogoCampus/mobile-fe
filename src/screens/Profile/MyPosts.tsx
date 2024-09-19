import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppScreens, AppScreensParamList } from '@navigation/paramTypes';
import MyPostFeed from '@components/feature-post/MyPostFeed';
import AddButton from '@components/feature-post/AddButton';
import Typography from '@components/ui/Typography';
import { AntDesign } from '@expo/vector-icons';
import Skeleton from '@components/ui/Skeleton';

function MyPosts(): JSX.Element {
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.MYPOST_SCREEN>>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handlePostPress = (postID: string) => {};

    const handleBackPress = () => {
        navigation.navigate(AppScreens.PROFILE_SCREEN);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-start w-full mb-5 pt-2.5 relative">
                <TouchableOpacity onPress={handleBackPress}>
                    <AntDesign name="left" size={27} color="black" />
                </TouchableOpacity>
                <View>
                    <Typography intent="subtitle" className="font-bold">
                        My Posts
                    </Typography>
                </View>
            </View>
            <View className="flex-1 bg-white w-full">
                {isLoading ? (
                    <View className="p-4">
                        <Skeleton intent="rounded" width={350} height={74} />
                    </View>
                ) : (
                    <>
                        <MyPostFeed onPostPress={handlePostPress} />
                        <AddButton />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

export default MyPosts;
