export interface Attachment {
    attachmentId: string;
    fileName: string;
    size: number;
    contentType: string;
    url: string;
}

export interface Comment {
    commentId: string;
    authorId: string;
    replyCount: number;
}

export interface Post {
    id: string;
    authorUserId: string;
    topicId: string;
    title: string;
    content: string;
    attachments: Attachment[];
    comments: Comment[];
    viewcount: number;
    likes: number;
    viewed: boolean;
    liked: boolean;
}

export interface ListPostResponse {
    status: number;
    data: Post;
    message: string;
}

export interface GroupPostsProps {
    postID: string;
    topicID: string;
}
