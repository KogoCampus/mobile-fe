import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import PostDetail from '@components/feature-post/PostDetail';
import CommentsList from '@components/feature-post/CommentsList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppScreens, AppScreensParamList } from '@navigation/paramTypes';
import { AntDesign } from '@expo/vector-icons';

type PostDetailsRouteProp = RouteProp<AppScreensParamList, AppScreens.POSTDETAIL_SCREEN>;

function PostDetails(): JSX.Element {
    const route = useRoute<PostDetailsRouteProp>();
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.POSTDETAIL_SCREEN>>();
    const { postID, topicID, savedActiveTab, savedFilter } = route.params;

    const handleBackPress = () => {
        navigation.navigate(AppScreens.HOME_SCREEN, {
            savedActiveTab,
            savedFilter,
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <TouchableOpacity onPress={handleBackPress} className="p-4">
                <AntDesign name="left" size={27} color="black" />
            </TouchableOpacity>
            <View className="flex-1">
                <PostDetail topicID={topicID} postID={postID} />
                <CommentsList topicID={topicID} postID={postID} />
            </View>
        </SafeAreaView>
    );
}

export default PostDetails;
