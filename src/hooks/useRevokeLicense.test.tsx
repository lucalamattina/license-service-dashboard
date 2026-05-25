import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useRevokeLicense } from './useRevokeLicense';
import { ApiError } from '../api/types';

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('useRevokeLicense', () => {
  it('returns the revoked License on success', async () => {
    const { result } = renderHook(() => useRevokeLicense(), {
      wrapper: createWrapper(),
    });

    result.current.mutate('lic-active-1');

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.id).toBe('lic-active-1');
    expect(result.current.data?.status).toBe('revoked');
  });

  it('surfaces a typed ApiError with code license_not_active when the backend rejects a non-active license', async () => {
    const { result } = renderHook(() => useRevokeLicense(), {
      wrapper: createWrapper(),
    });

    result.current.mutate('lic-expired-1');

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
    expect(result.current.error?.code).toBe('license_not_active');
    expect(result.current.error?.status).toBe(409);
    expect(result.current.error?.message).toContain('cannot be revoked');
  });
});
