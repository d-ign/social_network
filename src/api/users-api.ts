import { UserType } from '../types/types';
import { DefaultResponseType, instance } from './api';

type GetUsersType = {
  items: Array<UserType>
  totalCount: number
  error: string
}

export const usersAPI = {
  async getUsers(currentPage: number, pageSize: number, term?: string, friend?: boolean) {
    const response = await instance.get<GetUsersType>(
      `users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`
    );
    return response.data;
  },
  async followUser(id: number) {
    const response = await instance.post<DefaultResponseType>(`follow/${id}`, {});
    return response.data;
  },
  async unfollowUser(id: number) {
    const response = await instance.delete<DefaultResponseType>(`follow/${id}`);
    return response.data;
  },
}