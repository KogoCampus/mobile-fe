import React from 'react';
import { View, Text } from 'react-native';
import { useGetPostByID } from '@hooks-api/post/UseGetPostByID';
import { GroupPostsProps } from './types';
import PostDetailPreview from '../PostDetailPreview';
import Skeleton from '@components/ui/Skeleton';

const PostDetail: React.FC<GroupPostsProps> = function ({ topicID, postID }) {
    const { data: queryData, isLoading, isError } = useGetPostByID(topicID, postID);

    if (isLoading) {
        return (
            <View className="p-4">
                <Skeleton intent="rounded" width={350} height={74} />
            </View>
        );
    }

    if (isError || !queryData) {
        return <Text className="text-center text-base text-red-600">Error loading post.</Text>;
    }

    const { data } = queryData;

    return (
        <View className="p-4">
            <View key={data.id}>
                <PostDetailPreview
                    width={390}
                    height={74}
                    imagesUrl={[]}
                    imageLink={data.attachments.length > 0 ? { uri: data.attachments[0].url } : { uri: '' }}
                    title={data.title}
                    content={data.content}
                    timestamp={new Date()}
                    numOfLikes={data.likes}
                    numOfComments={data.comments.length}
                    userName="Anonymous"
                    authorSchoolName="SFU"
                    topicId={topicID}
                    postId={data.id.toString()}
                />
            </View>
        </View>
    );
};

export default PostDetail;
