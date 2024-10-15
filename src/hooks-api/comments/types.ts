export interface Comment {
    id: string;
    authorId: string;
    content: string;
    parentId: string | null;
    parentType: 'COMMENT' | 'POST';
    likes: number;
    liked: boolean;
    replyCount: number;
    createdAt: string;
}

export interface ListCommentResponse {
    status: number;
    data: Comment[];
    message: string;
}

export interface ListReplyResponse {
    status: number;
    data: Comment[];
    message: string;
}

export interface FetchCommentsParams {
    topicID: string;
    postID: string;
}

export interface FetchRepliesParams {
    topicID: string;
    postID: string;
    commentID: string;
}
export interface UseCommentsResult {
    data: Comment[] | undefined;
    isLoading: boolean;
    isError: boolean;
}
