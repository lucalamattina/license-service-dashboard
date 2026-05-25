import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useLicenses } from './useLicenses';

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('useLicenses', () => {
  it('returns the unwrapped License[] from the MSW handler', async () => {
    const { result } = renderHook(() => useLicenses(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeInstanceOf(Array);
    expect(result.current.data?.length).toBeGreaterThan(0);
    const first = result.current.data?.[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('status');
    expect(first).toHaveProperty('user_id');
    expect(first).toHaveProperty('product_id');
  });
});
