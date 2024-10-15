import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { PostPreviewProps } from './types';
import Typography from '@components/ui/Typography';

const PostDetailPreview: React.FC<PostPreviewProps> = ({
    imagesUrl,
    imageLink,
    title,
    content,
    timestamp,
    numOfLikes,
    numOfComments,
    userName,
    postId,
    topicId,
}) => {
    const formatDate = (date: Date) => {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    };

    const [placeholderImages, setPlaceholderImages] = useState(new Array(imagesUrl.length).fill(false));

    const renderImages = () => {
        return imagesUrl.slice(0, 2).map((url, index) => (
            <Image
                key={index}
                source={placeholderImages[index] ? require('../../../assets/images/logo.png') : { uri: url }}
                className="w-24 h-24 mr-2 rounded-lg bg-gray-300"
                onError={() => {
                    const newFallbacks = [...placeholderImages];
                    newFallbacks[index] = true;
                    setPlaceholderImages(newFallbacks);
                }}
            />
        ));
    };

    const [liked, setLiked] = useState(false);

    const toggleLike = () => {};

    return (
        <View className="bg-white rounded-lg w-full">
            <Typography className="text-sm text-gray-500 mb-1 px-4">{topicId}</Typography>

            <Typography className="text-lg font-bold mb-1 text-black px-4">{title}</Typography>

            {imagesUrl.length > 0 && <View className="flex-row mb-2 px-4">{renderImages()}</View>}

            <Typography className="text-sm text-gray-600 mb-2 px-4">{content}</Typography>

            <View className="flex-row justify-end items-center mb-2 px-4">
                <Image source={imageLink} className="w-10 h-10 rounded-full mr-2" />
                <View>
                    <Typography className="text-xs font-bold">{userName}</Typography>
                    <Typography className="text-xs text-gray-500">{formatDate(timestamp)}</Typography>
                </View>
            </View>

            <View className="flex-row justify-around items-center mt-3 border-t border-gray-200 pt-2">
                <TouchableOpacity className="flex-row items-center justify-center" onPress={toggleLike}>
                    <AntDesign name={liked ? 'heart' : 'hearto'} size={12} color="#B10606" />
                    <Typography className="text-xs ml-1">{numOfLikes}</Typography>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-center">
                    <Ionicons name="chatbox-outline" size={12} color="#5A5A5A" />
                    <Typography className="text-xs ml-1">{numOfComments}</Typography>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-center">
                    <Typography className="text-xs text-red-500">Report</Typography>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostDetailPreview;
