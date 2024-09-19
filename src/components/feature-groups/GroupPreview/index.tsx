import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GroupPreviewProps } from './types';
import Typography from '@components/ui/Typography';

const GroupPreview: React.FC<GroupPreviewProps> = function ({
    width,
    height,
    imageLink,
    groupName,
    groupDescription,
    numOfMembers,
    onPress = () => {},
}) {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row" style={{ width, height }}>
            <View className="flex-2 justify-center items-start">
                <View className="w-11 h-11 rounded-full border border-black justify-center items-center mr-2.5">
                    <Image
                        source={typeof imageLink === 'string' ? { uri: imageLink } : imageLink}
                        className="w-6 h-6"
                    />
                </View>
            </View>
            <View className="flex-8 justify-center items-start">
                <View>
                    <Typography className="text-sm font-bold text-left ml-1">{groupName}</Typography>
                    <Text numberOfLines={1} ellipsizeMode="tail" className="text-xs ml-2 text-left">
                        {groupDescription}
                    </Text>
                    <View className="flex-row ml-3 items-center">
                        <Ionicons name="person-outline" size={10} color="#5A5A5A" />
                        <Typography className="text-xs text-gray-600 ml-1">{numOfMembers} members</Typography>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default GroupPreview;
