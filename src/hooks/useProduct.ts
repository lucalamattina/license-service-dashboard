import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../api/products';

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id!),
    enabled: typeof id === 'string' && id.length > 0,
  });
}
