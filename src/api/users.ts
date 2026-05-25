import { apiFetch, apiFetchList } from './client';
import type { User } from './types';

export const getUsers = (): Promise<User[]> => apiFetchList<User>('/users');

export const getUser = (id: string): Promise<User> =>
  apiFetch<User>(`/users/${encodeURIComponent(id)}`);
