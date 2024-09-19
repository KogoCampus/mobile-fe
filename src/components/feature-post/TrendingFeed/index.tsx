import React from 'react';
import { View } from 'react-native';
import { useGetTrending } from '@hooks-api/post/UseGetTrending';
import Skeleton from '@components/ui/Skeleton';
import Preview from '../Preview';
import { List } from '@components/ui/List';
import { Post } from './types';

interface TrendingFeedProps {
    onPostPress: (postID: string) => void;
    onLoad?: () => void;
}

const TrendingFeed: React.FC<TrendingFeedProps> = ({ onPostPress }) => {
    const { data: queryData, isLoading } = useGetTrending();

    if (isLoading) {
        return (
            <View className="p-4">
                <Skeleton intent="rounded" width={350} height={74} />
            </View>
        );
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
        <View>
            <List>{data.map(item => renderPost({ item }))}</List>
        </View>
    );
};

export default TrendingFeed;
