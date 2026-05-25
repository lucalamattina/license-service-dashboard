import { ApiError } from './types';
import type { ApiErrorBody } from './types';

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!baseUrl) {
    throw new ApiError({
      code: 'config_error',
      message: 'VITE_API_URL is not set',
      status: 0,
    });
  }

  const hasBody = init?.body !== undefined && init?.body !== null;
  const defaultHeaders: Record<string, string> = hasBody
    ? { 'Content-Type': 'application/json' }
    : {};

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        ...defaultHeaders,
        ...(init?.headers ?? {}),
      },
    });
  } catch (err) {
    throw new ApiError({
      code: 'network_error',
      message: err instanceof Error ? err.message : 'Network request failed',
      status: 0,
    });
  }

  if (!response.ok) {
    let body: Partial<ApiErrorBody> = {};
    try {
      body = (await response.json()) as Partial<ApiErrorBody>;
    } catch {
      // 5xx with empty/non-JSON body — fall through to fallback message
    }
    throw new ApiError({
      code: body.error ?? 'unknown_error',
      message: body.message ?? `Request failed with status ${response.status}`,
      status: response.status,
      details: body.details,
    });
  }

  return (await response.json()) as T;
}

export async function apiFetchList<T>(path: string, init?: RequestInit): Promise<T[]> {
  const { data } = await apiFetch<{ data: T[] }>(path, init);
  return data;
}
