import { useQuery } from '@tanstack/react-query';
import { getLicenses } from '../api/licenses';

export function useLicenses() {
  return useQuery({
    queryKey: ['licenses'],
    queryFn: getLicenses,
  });
}
