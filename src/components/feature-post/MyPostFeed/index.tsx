import React from 'react';
import { View, Text } from 'react-native';
import { useGetMyPosts } from '@hooks-api/post/UseGetMyPosts';
import Preview from '../Preview';
import Skeleton from '@components/ui/Skeleton';
import { List } from '@components/ui/List';
import { Post } from './types';

interface MyPostFeedProps {
    onPostPress: (postID: string) => void;
}

const MyPostFeed: React.FC<MyPostFeedProps> = function ({ onPostPress }) {
    const { data: queryData, isLoading, isError } = useGetMyPosts();

    if (isLoading) {
        return (
            <View className="p-4">
                <Skeleton intent="rounded" width={350} height={74} />
            </View>
        );
    }

    if (isError || !queryData) {
        return <Text className="text-center text-base text-red-600">Error loading posts.</Text>;
    }

    const data: Post[] = queryData?.data ?? [];

    const renderPost = ({ item }: { item: Post }) => (
        <Preview
            key={item.id}
            width={390}
            height={74}
            imagesUrl={item.attachments.map(att => ({ uri: att.url }))}
            imageLink={item.attachments.length > 0 ? { uri: item.attachments[0].url } : { uri: '' }}
            groupName={item.topicId}
            title={item.title}
            contentPreview={item.content}
            timestamp={new Date()}
            numOfLikes={item.likes}
            numOfComments={item.comments.length}
            userName={item.authorUserId}
            authorSchoolName=""
            postId={item.id}
            onPress={() => onPostPress(item.id)}
        />
    );

    return (
        <View className="w-full">
            <List>{data.map(item => renderPost({ item }))}</List>
        </View>
    );
};

export default MyPostFeed;
