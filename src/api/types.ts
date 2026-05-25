export type LicenseStatus = 'active' | 'expired' | 'revoked';

export interface License {
  id: string;
  status: LicenseStatus;
  user_id: string;
  product_id: string;
  created_at: string;
  expires_at: string;
}

export interface User {
  id: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
}

export interface ApiErrorBody {
  error: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorInit {
  code: string;
  message: string;
  status: number;
  details?: unknown;
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: unknown;

  constructor(init: ApiErrorInit) {
    super(init.message);
    this.name = 'ApiError';
    this.code = init.code;
    this.status = init.status;
    this.details = init.details;
  }
}
