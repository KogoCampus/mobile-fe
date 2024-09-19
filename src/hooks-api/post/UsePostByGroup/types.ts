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

export interface ProfileImage {
    attachmentId: string;
    fileName: string;
    size: number;
    contentType: string;
    url: string;
}

export interface Group {
    id: string;
    ownerUserId: string;
    topicName: string;
    description: string;
    tags: string[];
    profileImage: ProfileImage;
}

export interface ListPostResponse {
    status: number;
    data: Post[];
    message: string;
}

export interface GroupResponse {
    status: number;
    data: Group;
    message: string;
}
