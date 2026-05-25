import { apiFetch, apiFetchList } from './client';
import type { License } from './types';

export const getLicenses = (): Promise<License[]> =>
  apiFetchList<License>('/licenses');

export const getLicense = (id: string): Promise<License> =>
  apiFetch<License>(`/licenses/${encodeURIComponent(id)}`);

export const revokeLicense = (id: string): Promise<License> =>
  apiFetch<License>(`/licenses/${encodeURIComponent(id)}/revoke`, {
    method: 'POST',
  });
