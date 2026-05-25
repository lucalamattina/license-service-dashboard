import { useQuery } from '@tanstack/react-query';
import { getLicense } from '../api/licenses';

export function useLicense(id: string | undefined) {
  return useQuery({
    queryKey: ['license', id],
    queryFn: () => getLicense(id!),
    enabled: typeof id === 'string' && id.length > 0,
  });
}
