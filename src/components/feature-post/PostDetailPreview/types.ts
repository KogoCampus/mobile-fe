import { ImageSourcePropType } from 'react-native';

export type PostPreviewProps = {
    width: number;
    height: number;
    imageLink: ImageSourcePropType;
    imagesUrl: string[];
    title: string;
    content: string;
    timestamp: Date;
    numOfLikes: number;
    numOfComments: number;
    userName: string;
    authorSchoolName: string;
    postId: string;
    topicId:string;
};
