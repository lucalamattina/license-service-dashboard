import type { License, Product, User } from './types';

export const users: User[] = [
  { id: 'u-1', email: 'alice@example.com' },
  { id: 'u-2', email: 'bob@example.com' },
  { id: 'u-3', email: 'carol@example.com' },
];

export const products: Product[] = [
  { id: 'p-1', name: 'Pro Plan' },
  { id: 'p-2', name: 'Team Plan' },
];

export const licenses: License[] = [
  {
    id: 'lic-active-1',
    status: 'active',
    user_id: 'u-1',
    product_id: 'p-1',
    created_at: '2026-01-01T00:00:00Z',
    expires_at: '2027-01-01T00:00:00Z',
  },
  {
    id: 'lic-active-2',
    status: 'active',
    user_id: 'u-2',
    product_id: 'p-2',
    created_at: '2026-02-01T00:00:00Z',
    expires_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'lic-expired-1',
    status: 'expired',
    user_id: 'u-1',
    product_id: 'p-2',
    created_at: '2024-01-01T00:00:00Z',
    expires_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'lic-revoked-1',
    status: 'revoked',
    user_id: 'u-3',
    product_id: 'p-1',
    created_at: '2025-06-01T00:00:00Z',
    expires_at: '2026-06-01T00:00:00Z',
  },
];
