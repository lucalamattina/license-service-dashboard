import { http, HttpResponse } from 'msw';
import { licenses, products, users } from '../api/fixtures';

const BASE_URL = 'http://localhost:3000';

export const handlers = [
  http.get(`${BASE_URL}/licenses`, () =>
    HttpResponse.json({ data: licenses }),
  ),
  http.get(`${BASE_URL}/licenses/:id`, ({ params }) => {
    const license = licenses.find((l) => l.id === params.id);
    if (!license) {
      return HttpResponse.json(
        { error: 'not_found', message: `License ${String(params.id)} not found` },
        { status: 404 },
      );
    }
    return HttpResponse.json(license);
  }),
  http.post(`${BASE_URL}/licenses/:id/revoke`, ({ params }) => {
    const license = licenses.find((l) => l.id === params.id);
    if (!license) {
      return HttpResponse.json(
        { error: 'not_found', message: `License ${String(params.id)} not found` },
        { status: 404 },
      );
    }
    if (license.status !== 'active') {
      return HttpResponse.json(
        {
          error: 'license_not_active',
          message: `License ${license.id} cannot be revoked because it is already ${license.status}`,
        },
        { status: 409 },
      );
    }
    return HttpResponse.json({ ...license, status: 'revoked' });
  }),
  http.get(`${BASE_URL}/users`, () => HttpResponse.json({ data: users })),
  http.get(`${BASE_URL}/users/:id`, ({ params }) => {
    const user = users.find((u) => u.id === params.id);
    if (!user) {
      return HttpResponse.json(
        { error: 'not_found', message: `User ${String(params.id)} not found` },
        { status: 404 },
      );
    }
    return HttpResponse.json(user);
  }),
  http.get(`${BASE_URL}/products`, () =>
    HttpResponse.json({ data: products }),
  ),
  http.get(`${BASE_URL}/products/:id`, ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) {
      return HttpResponse.json(
        { error: 'not_found', message: `Product ${String(params.id)} not found` },
        { status: 404 },
      );
    }
    return HttpResponse.json(product);
  }),
];
