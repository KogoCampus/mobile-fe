import { useQuery, QueryOptions, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FetchCommentsParams, ListCommentResponse, UseCommentsResult } from '../types';
import { BaseErrorResponse } from '../../types';

const fetchCommentsByPostID = async ({ topicID, postID }: FetchCommentsParams): Promise<ListCommentResponse> => {
    try {
        const response = await axios.get<ListCommentResponse>(`kogo/media/topics/${topicID}/posts/${postID}/comments`);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response?.data;
    }
};

export const useGetCommentsByPostID = (
    topicID: string,
    postID: string,
    queryOptions?: QueryOptions<ListCommentResponse, BaseErrorResponse>
): UseQueryResult<ListCommentResponse, BaseErrorResponse> => {
    return useQuery<ListCommentResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['comments', topicID, postID],
        queryFn: () => fetchCommentsByPostID({ topicID, postID }),
    });
};
