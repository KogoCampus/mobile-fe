import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import Skeleton from '@components/ui/Skeleton';
import SearchBar from '@components/feature-post/SearchBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AppScreensParamList, AppScreens } from '@navigation/paramTypes';
import { Ionicons } from '@expo/vector-icons';
import Typography from '@components/ui/Typography';

type SearchResultScreenNavigationProp = StackNavigationProp<AppScreensParamList, AppScreens.SEARCHRESULT_SCREEN>;
type SearchResultScreenRouteProp = RouteProp<AppScreensParamList, AppScreens.SEARCHRESULT_SCREEN>;

type Props = {
    navigation: SearchResultScreenNavigationProp;
    route: SearchResultScreenRouteProp;
};

const SearchResultScreen: React.FC<Props> = function ({ navigation, route }) {
    const { searchTerm } = route.params;
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    const hideSearchBar = (newSearchTerm?: string) => {
        setShowSearchBar(false);
        if (newSearchTerm) {
            setCurrentSearchTerm(newSearchTerm);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {showSearchBar ? (
                <SearchBar
                    onGroupSelect={() => {}}
                    hideSearchBar={hideSearchBar}
                    initialSearchTerm={currentSearchTerm}
                />
            ) : (
                <TouchableOpacity
                    onPress={toggleSearchBar}
                    className="p-4 flex-row items-center border-b border-gray-300">
                    <Ionicons name="search" size={24} color="black" className="mr-2" />
                    <Typography intent="text">{currentSearchTerm || 'Search Groups'}</Typography>
                </TouchableOpacity>
            )}
            {!showSearchBar && (
                <View className="p-2">
                    <Skeleton intent="rounded" width={390} height={70} className="mb-2" />
                    <Skeleton intent="rounded" width={390} height={70} className="mb-2" />
                    <Skeleton intent="rounded" width={390} height={70} className="mb-2" />
                    <Skeleton intent="rounded" width={390} height={70} className="mb-2" />
                </View>
            )}
        </SafeAreaView>
    );
};

export default SearchResultScreen;
