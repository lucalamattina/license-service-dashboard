import { apiFetch, apiFetchList } from './client';
import type { Product } from './types';

export const getProducts = (): Promise<Product[]> =>
  apiFetchList<Product>('/products');

export const getProduct = (id: string): Promise<Product> =>
  apiFetch<Product>(`/products/${encodeURIComponent(id)}`);
