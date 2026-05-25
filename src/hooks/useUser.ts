import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/users';

export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id!),
    enabled: typeof id === 'string' && id.length > 0,
  });
}
