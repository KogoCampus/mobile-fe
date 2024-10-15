import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppScreens, AppScreensParamList } from '@navigation/paramTypes';
import MyGroupFeed from '@components/feature-post/MyGroupFeed';
import TrendingFeed from '@components/feature-post/TrendingFeed';
import Skeleton from '@components/ui/Skeleton';
import Radio from '@components/ui/Radio';
import Typography from '@components/ui/Typography';
import AddButton from '@components/feature-post/AddButton';
import SearchBar from '@components/feature-post/SearchBar';
import { Entypo, Ionicons } from '@expo/vector-icons';

type HomeRouteProp = RouteProp<AppScreensParamList, AppScreens.HOME_SCREEN>;

function Home(): JSX.Element {
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.HOME_SCREEN>>();
    const route = useRoute<HomeRouteProp>();

    const [activeTab, setActiveTab] = useState(route.params?.savedActiveTab ?? 'Following');
    const [filter, setFilter] = useState(route.params?.savedFilter ?? 'SFU');
    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
    const [isFeedLoaded, setFeedLoaded] = useState(true);

    const mockedGroupId = '999';

    const handleSearchIconPress = () => {
        setIsSearchModalVisible(true);
    };

    const handleSearchClose = () => {
        setIsSearchModalVisible(false);
    };

    const handleNotificationIconPress = () => {
        navigation.navigate(AppScreens.NOTIFICATION_SCREEN);
    };

    const handlePostPress = (topicID: string, postID: string) => {
        navigation.navigate(AppScreens.POSTDETAIL_SCREEN, {
            topicID,
            postID,
            savedActiveTab: activeTab,
            savedFilter: filter,
        });
    };

    useEffect(() => {
        if (isFeedLoaded) {
            return;
        }
    }, [isFeedLoaded]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View>
                <View className="flex-row justify-between items-center p-1 bg-white">
                    <View className="pl-2">
                        <Image source={require('../../assets/images/logo.png')} className="w-24 h-12" />
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={handleSearchIconPress}>
                            <Entypo name="magnifying-glass" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNotificationIconPress}>
                            <Ionicons name="notifications-sharp" size={20} color="black" className="m-3" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="h-0.5 bg-gray-300 mx-2" />
            </View>
            <View className="flex-row justify-center border-b border-gray-300 bg-white">
                <TouchableOpacity
                    className={`py-2 px-4 mx-10 ${activeTab === 'Following' ? 'border-b-2 border-black' : ''}`}
                    onPress={() => setActiveTab('Following')}>
                    <Typography intent="text">Following</Typography>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`py-2 px-4 mx-10 ${activeTab === 'Trending' ? 'border-b-2 border-black' : ''}`}
                    onPress={() => setActiveTab('Trending')}>
                    <Typography intent="text">Trending</Typography>
                </TouchableOpacity>
            </View>
            <View className="h-2" />
            {(() => {
                if (activeTab === 'Trending') {
                    return <TrendingFeed onPostPress={(postID) => handlePostPress(mockedGroupId, postID)} />;
                }

                return (
                    <View className="flex-1 bg-white">
                        <View className="flex-row my-2 bg-white">
                            <Radio
                                label="only SFU"
                                selected={filter === 'SFU'}
                                onPress={() => setFilter('SFU')}
                                className="mx-2"
                            />
                            <Radio
                                label="all groups"
                                selected={filter === 'All'}
                                onPress={() => setFilter('All')}
                                className="mx-2"
                            />
                        </View>

                        {isFeedLoaded ? (
                            <MyGroupFeed
                                filter={mockedGroupId}
                                onPostPress={(postID) => handlePostPress(mockedGroupId, postID)}
                                onLoad={() => setFeedLoaded(true)}
                            />
                        ) : (
                            <Skeleton intent="rounded" width={380} height={150} className="ml-2" />
                        )}
                    </View>
                );
            })()}
            <AddButton />

            <Modal visible={isSearchModalVisible} animationType="slide" onRequestClose={handleSearchClose}>
                <SafeAreaView className="flex-1 bg-white">
                    <SearchBar onGroupSelect={() => {}} hideSearchBar={handleSearchClose} />
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

export default Home;
