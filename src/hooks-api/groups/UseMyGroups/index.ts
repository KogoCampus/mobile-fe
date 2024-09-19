import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListGroupResponse } from './types';
import { BaseErrorResponse } from '../../types';

const fetchMyGroups = async (): Promise<ListGroupResponse> => {
    try {
        const response = await axios.get<ListGroupResponse>('/kogo/me/following', {});
        return response.data;
    } catch (err) {
        throw (err as AxiosError).response?.data;
    }
};

export function useMyGroup(queryOptions?: UseQueryOptions<ListGroupResponse, BaseErrorResponse>) {
    return useQuery<ListGroupResponse, BaseErrorResponse>({
        queryKey: ['myGroups'],
        queryFn: () => fetchMyGroups(),
        ...queryOptions,
    });
}
