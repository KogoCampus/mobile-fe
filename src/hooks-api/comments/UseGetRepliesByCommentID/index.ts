import { useQuery, QueryOptions, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FetchRepliesParams, ListReplyResponse, UseCommentsResult } from '../types';
import { BaseErrorResponse } from '../../types';

const fetchRepliesByCommentID = async ({
    topicID,
    postID,
    commentID,
}: FetchRepliesParams): Promise<ListReplyResponse> => {
    try {
        const response = await axios.get<ListReplyResponse>(
            `kogo/media/topics/${topicID}/posts/${postID}/comments/${commentID}/replies`,
        );
        console.log(response.data, 'res');
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response?.data;
    }
};

export const useGetRepliesByCommentID = (
    topicID: string,
    postID: string,
    commentID: string,
    queryOptions?: QueryOptions<ListReplyResponse, BaseErrorResponse>,
): UseQueryResult<ListReplyResponse, BaseErrorResponse> => {
    return useQuery<ListReplyResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['replies', topicID, postID, commentID],
        queryFn: () => fetchRepliesByCommentID({ topicID, postID, commentID }),
    });
};
