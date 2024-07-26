/* eslint-disable global-require */
import React, { useState, useEffect, useRef } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import {
    View,
    FlatList,
    TouchableOpacity,
    Keyboard,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TextInputFocusEventData,
    TextInputSubmitEditingEventData,
    TextInput,
} from 'react-native';
import Typography from '@components/ui/Typography';
import TextButton from '@components/ui/TextButton';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { AppScreens, AppScreensParamList } from '@navigation/paramTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchField from '@components/ui/SearchField';

type SearchBarProps = {
    onGroupSelect: (groupId: string) => void;
    hideSearchBar: (searchTerm?: string) => void;
    initialSearchTerm?: string;
};

type SearchResultScreenNavigationProp = StackNavigationProp<AppScreensParamList, AppScreens.SEARCHRESULT_SCREEN>;

const SearchBar: React.FC<SearchBarProps> = function ({ onGroupSelect, hideSearchBar, initialSearchTerm = '' }) {
    const [input, setInput] = useState(initialSearchTerm);
    const [, setCurrentKeyword] = useState(initialSearchTerm);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [, setLoading] = useState(false);
    const navigation = useNavigation<SearchResultScreenNavigationProp>();
    const searchFieldRef = useRef<TextInput>(null);

    useEffect(() => {
        loadSearchHistory();
        if (searchFieldRef.current) {
            searchFieldRef.current.focus();
            setShowHistory(true);
        }
    }, []);

    const loadSearchHistory = async () => {
        try {
            const history = await SecureStore.getItemAsync('searchHistory');
            if (history) {
                setSearchHistory(JSON.parse(history));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveSearchHistory = async (history: string[]) => {
        try {
            await SecureStore.setItemAsync('searchHistory', JSON.stringify(history));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (searchTerm = input) => {
        if (searchTerm.trim()) {
            const newHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)];
            setSearchHistory(newHistory);
            saveSearchHistory(newHistory);
            setCurrentKeyword(searchTerm);
            setInput(searchTerm);
            setShowHistory(false);
            setLoading(true);
            hideSearchBar(searchTerm);
            navigation.navigate(AppScreens.SEARCHRESULT_SCREEN, { searchTerm });
        }
    };

    const handleCancel = () => {
        setInput('');
        setShowHistory(false);
        Keyboard.dismiss();
        hideSearchBar();
    };

    const handleClear = () => {
        setInput('');
        setShowHistory(true);
    };

    const handleBackPress = () => {
        hideSearchBar();
        navigation.navigate(AppScreens.HOME_SCREEN);
    };

    const deleteSearchHistory = () => {
        setSearchHistory([]);
        saveSearchHistory([]);
    };

    const deleteHistoryItem = (index: number) => {
        const newHistory = searchHistory.filter((_, i) => i !== index);
        setSearchHistory(newHistory);
        saveSearchHistory(newHistory);
    };

    const handleHistoryItemClick = (item: string) => {
        setInput(item);
        handleSearch(item);
    };

    return (
        <View className="p-2">
            <View className="flex-row items-center">
                <TouchableOpacity onPress={handleBackPress}>
                    <AntDesign name="left" size={27} color="black" className="mr-2" />
                </TouchableOpacity>
                <SearchField
                    ref={searchFieldRef}
                    placeholder="Search Posts"
                    value={input}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setInput(e.nativeEvent.text)}
                    onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => setShowHistory(true)}
                    onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) =>
                        handleSearch(e.nativeEvent.text)
                    }
                    className="flex-1 border-b-2 border-gray-300 bg-transparent w-80 p-1"
                />
                {input && (
                    <TouchableOpacity onPress={handleClear}>
                        <Feather name="x" size={24} color="black" className="ml-2" />
                    </TouchableOpacity>
                )}
                {showHistory && (
                    <TextButton intent="default" size="sm" onPress={handleCancel} className="ml-2">
                        Cancel
                    </TextButton>
                )}
            </View>
            {showHistory && (
                <View>
                    <View className="flex-row justify-between items-center py-2">
                        <Typography intent="text">Latest Search</Typography>
                        <TextButton intent="text" size="sm" onPress={deleteSearchHistory} className="self-end">
                            Delete All
                        </TextButton>
                    </View>
                    <FlatList
                        data={searchHistory}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View className="flex-row justify-between items-center py-1">
                                <TouchableOpacity
                                    onPress={() => handleHistoryItemClick(item)}
                                    className="flex-1 flex-row justify-start items-center">
                                    <Typography intent="text">{item}</Typography>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteHistoryItem(index)}>
                                    <Feather name="x" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default SearchBar;
