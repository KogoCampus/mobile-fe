import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { PostPreviewProps } from './types';

const PostPreview: React.FC<PostPreviewProps> = ({
    imagesUrl,
    imageLink,
    groupName,
    title,
    contentPreview,
    timestamp,
    numOfLikes,
    numOfComments,
    userName,
    postId,
    onPress,
}) => {
    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        const weeks = Math.floor(diff / (86400000 * 7));
        const months = Math.floor(diff / (86400000 * 30));
        const years = Math.floor(diff / (86400000 * 365));

        if (minutes < 1) {
            return 'Just now';
        } else if (minutes < 60) {
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else if (days < 7) {
            return `${days}d`;
        } else if (weeks < 4) {
            return `${weeks}w`;
        } else if (months < 12) {
            return `${months}mo`;
        } else {
            return `${years}y`;
        }
    };

    const [likeCount, setLikeCount] = useState(numOfLikes || 0);
    // const { data: likeCheck, isLoading } = usePostLikeCheck(postId.toString());
    // const [liked, setLiked] = useState(likeCheck == 1);

    // useEffect(() => {
    //     if (likeCheck !== undefined) {
    //         setLiked(likeCheck === 1);
    //     }
    // }, [likeCheck]);

    // const { mutate: likePost } = useAddPostLike();
    // const { mutate: unlikePost } = useDeletePostLike();

    const toggleLike = () => {
        // if (liked) {
        //     setLiked(false);
        //     setLikeCount((prev) => prev - 1);
        //     unlikePost({ postId });
        // } else {
        //     setLiked(true);
        //     setLikeCount((prev) => prev + 1);
        //     likePost({ postId });
        // }
    };

    // if (isLoading) {
    //     return null;
    // }

    return (
        <View className="p-2">
            <TouchableOpacity onPress={onPress} className="flex flex-col bg-white rounded-lg p-4">
                <View className="flex-row items-center">
                    <Image
                        source={typeof imageLink === 'string' ? { uri: imageLink } : imageLink}
                        className="w-8 h-8 rounded-full"
                    />
                    <View className="ml-2">
                        <Text className="font-bold text-sm">{userName}</Text>
                        <Text className="text-xs text-gray-500">{formatDate(new Date(timestamp))}</Text>
                    </View>
                </View>
                <View className="mt-2">
                    <Text className="text-lg font-bold">{title}</Text>
                    <Text className="text-sm text-gray-600 mt-2">{contentPreview}</Text>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                    <View className="bg-gray-200 rounded-md px-2 py-1">
                        <Text className="text-xs">{groupName}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={toggleLike}>
                            <AntDesign name={'hearto'} size={12} color="#B10606" />
                        </TouchableOpacity>
                        <Text className="ml-1 text-xs">{likeCount}</Text>
                        <Ionicons name="chatbox-outline" size={12} color="#5A5A5A" className="ml-4" />
                        <Text className="ml-1 text-xs">{numOfComments}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PostPreview;
