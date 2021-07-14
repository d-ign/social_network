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
  followUser(id: number) {
    return instance.post<DefaultResponseType>(`follow/${id}`, {})
  },
  unfollowUser(id: number) {
    return instance.delete<DefaultResponseType>(`follow/${id}`)
  },
}