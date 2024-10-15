import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { BaseErrorResponse } from '../../types';

const fetchPostByID = async (topicID: string, postID: string): Promise<ListPostResponse> => {
    try {
        const response = await axios.get<ListPostResponse>(`kogo/media/topics/${topicID}/posts/${postID}`, {
            // headers: {
            //     Authorization: `Bearer ${jwt}`,
            // },
        });
        return response.data;
    } catch (err) {
        throw (err as AxiosError).response?.data;
    }
};

export function useGetPostByID(
    topicID: string,
    postID: string,
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['postID', postID],
        queryFn: () =>
            postID ? fetchPostByID(topicID, postID) : Promise.reject(new Error('Post information not available')),
    });
}
