import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../test/setup';
import { apiFetch } from './client';
import { ApiError } from './types';

const BASE_URL = 'http://localhost:8080';

describe('apiFetch', () => {
  it('returns the parsed body on 2xx', async () => {
    server.use(
      http.get(`${BASE_URL}/echo`, () =>
        HttpResponse.json({ hello: 'world' }),
      ),
    );
    const result = await apiFetch<{ hello: string }>('/echo');
    expect(result).toEqual({ hello: 'world' });
  });

  it('throws a typed ApiError mapped from a 4xx error envelope', async () => {
    server.use(
      http.get(`${BASE_URL}/boom`, () =>
        HttpResponse.json(
          {
            error: 'validation_error',
            message: 'email is required',
            details: { field: 'email' },
          },
          { status: 400 },
        ),
      ),
    );

    try {
      await apiFetch('/boom');
      expect.fail('apiFetch should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      const apiErr = err as ApiError;
      expect(apiErr.code).toBe('validation_error');
      expect(apiErr.message).toBe('email is required');
      expect(apiErr.status).toBe(400);
      expect(apiErr.details).toEqual({ field: 'email' });
    }
  });

  it('throws a fallback ApiError on 5xx with no body', async () => {
    server.use(
      http.get(
        `${BASE_URL}/server-error`,
        () => new HttpResponse(null, { status: 500 }),
      ),
    );

    try {
      await apiFetch('/server-error');
      expect.fail('apiFetch should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      const apiErr = err as ApiError;
      expect(apiErr.code).toBe('unknown_error');
      expect(apiErr.status).toBe(500);
      expect(apiErr.message).toContain('500');
    }
  });

  it('throws a network_error ApiError on transport failure', async () => {
    server.use(http.get(`${BASE_URL}/offline`, () => HttpResponse.error()));

    try {
      await apiFetch('/offline');
      expect.fail('apiFetch should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      const apiErr = err as ApiError;
      expect(apiErr.code).toBe('network_error');
      expect(apiErr.status).toBe(0);
    }
  });
});
