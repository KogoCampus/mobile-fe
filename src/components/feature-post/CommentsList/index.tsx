import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useGetCommentsByPostID } from '@hooks-api/comments/UseGetCommentsByPostID';
import { useGetRepliesByCommentID } from '@hooks-api/comments/UseGetRepliesByCommentID';
import { Comment } from './types';
import { ScrollableList } from '@components/ui/ScrollableList';
import Typography from '@components/ui/Typography';

const formatDate = (date: string) => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  return `${days}d`;
};

const CommentItem: React.FC<{
  comment: Comment;
  onReplyPress?: (comment: Comment) => void;
}> = ({ comment, onReplyPress }) => {
  const [liked, setLiked] = useState(comment.liked || false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  return (
    <View className="bg-white p-4 mb-2 rounded-lg flex-row justify-between items-start">
      <View style={{ flex: 1 }}>
        <View className="flex-row items-center">
          <View className="flex-1">
            <Typography className="text-black">{comment.authorId}</Typography>
            <Typography className="text-gray-500 text-xs">
              {formatDate(comment.createdAt)}
            </Typography>
          </View>
        </View>
        <Typography className="mt-2 mb-2 text-gray-700">
          {comment.content}
        </Typography>
        <View className="flex-row space-x-4">
          {onReplyPress && (
            <TouchableOpacity onPress={() => onReplyPress(comment)}>
              <Typography className="text-xs text-black font-bold">
                {comment.replyCount} replies
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={toggleLike}
        className="flex-row items-center ml-2 mt-1"
      >
        <AntDesign
          name={liked ? 'heart' : 'hearto'}
          size={16}
          color="#B10606"
        />
        <Typography className="text-xs ml-1">{likesCount}</Typography>
      </TouchableOpacity>
    </View>
  );
};


const RepliesSection: React.FC<{
  topicID: string;
  postID: string;
  parentComment: Comment;
  onBack: () => void;
}> = ({ topicID, postID, parentComment, onBack }) => {
  const {
    data: repliesData,
    isLoading,
    error,
  } = useGetRepliesByCommentID(topicID, postID, parentComment.id);

  return (
    <View className="flex-1">
      <View className="bg-white p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={onBack}>
            <AntDesign name="left" size={27} color="black" />
          </TouchableOpacity>
          <Typography className="text-lg font-bold ml-2">Replies</Typography>
        </View>
      </View>
      <ScrollableList intent="vertical" style={{ padding: 8, flex: 1 }}>
        <CommentItem comment={parentComment} />
        <View className="ml-4">
          {isLoading ? (
            <Typography>Loading replies...</Typography>
          ) : error ? (
            <Typography>Error loading replies.</Typography>
          ) : (
            repliesData?.data?.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))
          )}
        </View>
      </ScrollableList>
      <View className="flex-row items-center border-t border-gray-200 p-4 bg-white">
        <TextInput
          className="flex-1 h-10 px-4 bg-gray-100 rounded-full"
          placeholder="Add a reply..."
        />
        <TouchableOpacity>
          <Ionicons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommentsSection: React.FC<{ topicID: string; postID: string }> = ({
  topicID,
  postID,
}) => {
  const [showingReplies, setShowingReplies] = useState(false);
  const [parentComment, setParentComment] = useState<Comment | null>(null);

  const {
    data: commentsData,
    isLoading,
    error,
  } = useGetCommentsByPostID(topicID, postID);

  const handleReplyPress = (comment: Comment) => {
    setParentComment(comment);
    setShowingReplies(true);
  };

  const handleBackToComments = () => {
    setShowingReplies(false);
    setParentComment(null);
  };

  const renderCommentItem = (comment: Comment) => {
    return (
      <CommentItem
        key={comment.id}
        comment={comment}
        onReplyPress={handleReplyPress}
      />
    );
  };

  if (showingReplies && parentComment) {
    return (
      <RepliesSection
        topicID={topicID}
        postID={postID}
        parentComment={parentComment}
        onBack={handleBackToComments}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View className="flex-1">
        <View className="bg-white p-4 border-b border-gray-200">
          <Typography className="text-lg font-bold ml-2">Comments</Typography>
        </View>

        <ScrollableList intent="vertical" style={{ padding: 8, flex: 1 }}>
          {isLoading ? (
            <Typography>Loading comments...</Typography>
          ) : error ? (
            <Typography>Error loading comments.</Typography>
          ) : (
            commentsData?.data?.map((comment) => renderCommentItem(comment))
          )}
        </ScrollableList>

        <View className="flex-row items-center border-t border-gray-200 p-4 bg-white">
          <TextInput
            className="flex-1 h-10 px-4 bg-gray-100 rounded-full"
            placeholder="Add a comment..."
          />
          <TouchableOpacity>
            <Ionicons name="send" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentsSection;
