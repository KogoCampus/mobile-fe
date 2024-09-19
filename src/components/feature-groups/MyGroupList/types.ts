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
    userCount: number;
}

export interface ListGroupResponse {
    status: number;
    data: Group[];
    message: string;
}
