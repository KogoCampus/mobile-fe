import React from 'react';
import { View } from 'react-native';
import { usePostsByMyGroup } from '@hooks-api/post/UsePostByGroup';
import Skeleton from '@components/ui/Skeleton';
import Preview from '../Preview';
import { List } from '@components/ui/List';
import { Post } from './types';

interface MyGroupFeedProps {
    filter: string;
    onPostPress: (postID: string) => void;
    onLoad?: () => void;
}

const MyGroupFeed: React.FC<MyGroupFeedProps> = ({ filter, onPostPress }) => {
    const { data: queryData, isLoading } = usePostsByMyGroup(filter);

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

export default MyGroupFeed;
