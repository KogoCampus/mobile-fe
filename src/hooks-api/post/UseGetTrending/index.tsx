import { useQuery, QueryOptions, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { BaseErrorResponse } from '../../types';

const fetchTrending = async (): Promise<ListPostResponse> => {
    try {
        const response = await axios.get<ListPostResponse>(`/kogo/media/feeds/trending`, {
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        });

        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (err) {
        throw err;
    }
};

export function useGetTrending(
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['postsByGroup'],
        queryFn: () => fetchTrending(),
    });
}
