import { describe, expect, it } from 'vitest';
import { joinLicenses } from './joinLicenses';
import { licenses, products, users } from '../api/fixtures';
import type { Product, User } from '../api/types';

describe('joinLicenses', () => {
  it('joins user emails and product names by id', () => {
    const usersById = new Map(users.map((u) => [u.id, u]));
    const productsById = new Map(products.map((p) => [p.id, p]));
    const rows = joinLicenses(licenses, usersById, productsById);

    expect(rows.length).toBe(licenses.length);

    const activeRow = rows.find((r) => r.id === 'lic-active-1');
    expect(activeRow?.user_email).toBe('alice@example.com');
    expect(activeRow?.product_name).toBe('Pro Plan');
  });

  it('falls back to "Unknown user" / "Unknown product" for orphaned references', () => {
    const emptyUsers = new Map<string, User>();
    const emptyProducts = new Map<string, Product>();
    const rows = joinLicenses(licenses, emptyUsers, emptyProducts);

    expect(rows[0].user_email).toBe('Unknown user');
    expect(rows[0].product_name).toBe('Unknown product');
  });

  it('preserves every license field on the joined row', () => {
    const usersById = new Map(users.map((u) => [u.id, u]));
    const productsById = new Map(products.map((p) => [p.id, p]));
    const rows = joinLicenses(licenses, usersById, productsById);
    const first = rows[0];

    expect(first).toMatchObject({
      id: licenses[0].id,
      status: licenses[0].status,
      user_id: licenses[0].user_id,
      product_id: licenses[0].product_id,
      created_at: licenses[0].created_at,
      expires_at: licenses[0].expires_at,
    });
  });
});
