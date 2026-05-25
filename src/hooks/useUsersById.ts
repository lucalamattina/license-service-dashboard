import { useMemo } from 'react';
import { useUsers } from './useUsers';
import type { User } from '../api/types';

export function useUsersById() {
  const { data, isLoading, isError, error } = useUsers();
  const byId = useMemo<Map<string, User>>(
    () => (data ? new Map(data.map((u) => [u.id, u])) : new Map()),
    [data],
  );
  return { byId, isLoading, isError, error };
}
