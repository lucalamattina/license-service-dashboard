import { useMemo } from 'react';
import { useProducts } from './useProducts';
import type { Product } from '../api/types';

export function useProductsById() {
  const { data, isLoading, isError, error } = useProducts();
  const byId = useMemo<Map<string, Product>>(
    () => (data ? new Map(data.map((p) => [p.id, p])) : new Map()),
    [data],
  );
  return { byId, isLoading, isError, error };
}
