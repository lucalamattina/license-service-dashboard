import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useLicenses } from '../hooks/useLicenses';
import { useProductsById } from '../hooks/useProductsById';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { formatDate, truncateId } from '../lib/format';
import type { License, Product } from '../api/types';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userQuery = useUser(id);
  const licensesQuery = useLicenses();
  const { byId: productsById } = useProductsById();

  if (userQuery.isLoading) {
    return <LoadingState />;
  }

  if (userQuery.isError) {
    return (
      <ErrorState
        error={userQuery.error}
        onRetry={() => {
          void userQuery.refetch();
        }}
      />
    );
  }

  if (!userQuery.data || !id) return null;

  const user = userQuery.data;
  const allLicenses = licensesQuery.data ?? [];
  const userLicenses = allLicenses.filter((l) => l.user_id === user.id);

  const activeProductIds = new Set(
    userLicenses.filter((l) => l.status === 'active').map((l) => l.product_id),
  );
  const activeProducts = Array.from(activeProductIds)
    .map((pid) => productsById.get(pid))
    .filter((p): p is Product => p !== undefined);

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link to="/users" className="text-sm text-gray-600 hover:underline">
          ← Back to users
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold">User</h1>

      <dl className="mb-8 grid max-w-2xl grid-cols-[max-content_1fr] gap-x-6 gap-y-3 text-sm">
        <dt className="font-medium text-gray-500">Email</dt>
        <dd className="text-gray-900">{user.email}</dd>

        <dt className="font-medium text-gray-500">ID</dt>
        <dd className="font-mono text-xs text-gray-900">{user.id}</dd>
      </dl>

      <section className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Active products</h2>
        {activeProducts.length === 0 ? (
          <p className="text-sm text-gray-500">
            This user has no active products.
          </p>
        ) : (
          <ul className="space-y-1 text-sm">
            {activeProducts.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Licenses</h2>
        {licensesQuery.isLoading ? (
          <LoadingState />
        ) : licensesQuery.isError ? (
          <ErrorState
            error={licensesQuery.error}
            onRetry={() => {
              void licensesQuery.refetch();
            }}
          />
        ) : userLicenses.length === 0 ? (
          <EmptyState message="This user has no licenses." />
        ) : (
          <DataTable<License>
            rows={userLicenses}
            rowKey={(l) => l.id}
            onRowClick={(l) => navigate(`/licenses/${l.id}`)}
            columns={[
              {
                key: 'status',
                header: 'Status',
                cell: (l) => <StatusBadge status={l.status} />,
              },
              {
                key: 'id',
                header: 'License',
                cell: (l) => (
                  <span className="font-mono text-xs text-gray-700">
                    …{truncateId(l.id)}
                  </span>
                ),
              },
              {
                key: 'product',
                header: 'Product',
                cell: (l) =>
                  productsById.get(l.product_id)?.name ?? l.product_id,
              },
              {
                key: 'expires',
                header: 'Expires',
                cell: (l) => formatDate(l.expires_at),
              },
              {
                key: 'created',
                header: 'Created',
                cell: (l) => formatDate(l.created_at),
              },
            ]}
          />
        )}
      </section>
    </div>
  );
}
