import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Skeleton from '@components/ui/Skeleton';
import Radio from '@components/ui/Radio';
import Typography from '@components/ui/Typography';

function Main(): JSX.Element {
    const [activeTab, setActiveTab] = useState('Following');
    const [filter, setFilter] = useState('SFU');

    // const [isFeedLoaded, setFeedLoaded] = useState(false);
    // const [isTrendingLoaded, setTrendingLoaded] = useState(false);
    const [isFeedLoaded] = useState(false);
    const [isTrendingLoaded] = useState(false);

    useEffect(() => {}, []);

    /* eslint-disable global-require */
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View>
                <View className="flex-row justify-between items-center p-4 bg-white">
                    <View className="pl-2">
                        <Image source={require('../../assets/images/logo.png')} className="w-24 h-12" />
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity>
                            <Entypo name="magnifying-glass" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="notifications-sharp" size={20} color="black" className="ml-4" />
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
                    if (isTrendingLoaded) {
                        return (
                            <Typography intent="text" className="text-center mt-4">
                                Trending Content
                            </Typography>
                        );
                    }
                    return <Skeleton intent="rounded" width={380} height={75} className="ml-2" />;
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
                            <Typography intent="text" className="text-center mt-4">
                                My Group Feed Content
                            </Typography>
                        ) : (
                            <Skeleton intent="rounded" width={380} height={150} className="ml-2" />
                        )}
                    </View>
                );
            })()}
        </SafeAreaView>
    );
}

export default Main;
