import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useUsersById } from './useUsersById';

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('useUsersById', () => {
  it('builds a Map keyed by user id once the underlying query resolves', async () => {
    const { result } = renderHook(() => useUsersById(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.byId).toBeInstanceOf(Map);
    expect(result.current.byId.size).toBeGreaterThan(0);
    // From fixtures
    expect(result.current.byId.get('u-1')?.email).toBe('alice@example.com');
    expect(result.current.byId.get('u-2')?.email).toBe('bob@example.com');
  });

  it('returns an empty Map while loading', () => {
    const { result } = renderHook(() => useUsersById(), {
      wrapper: createWrapper(),
    });
    // Before the query resolves
    expect(result.current.byId).toBeInstanceOf(Map);
    expect(result.current.byId.size).toBe(0);
  });
});
