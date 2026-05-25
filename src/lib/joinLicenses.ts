import type { License, Product, User } from '../api/types';

export interface LicenseRow extends License {
  user_email: string;
  product_name: string;
}

export function joinLicenses(
  licenses: License[],
  usersById: Map<string, User>,
  productsById: Map<string, Product>,
): LicenseRow[] {
  return licenses.map((license) => ({
    ...license,
    user_email: usersById.get(license.user_id)?.email ?? 'Unknown user',
    product_name:
      productsById.get(license.product_id)?.name ?? 'Unknown product',
  }));
}
