import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useLicenses } from '../hooks/useLicenses';
import { useUsersById } from '../hooks/useUsersById';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { formatDate, truncateId } from '../lib/format';
import type { License } from '../api/types';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productQuery = useProduct(id);
  const licensesQuery = useLicenses();
  const { byId: usersById } = useUsersById();

  if (productQuery.isLoading) {
    return <LoadingState />;
  }

  if (productQuery.isError) {
    return (
      <ErrorState
        error={productQuery.error}
        onRetry={() => {
          void productQuery.refetch();
        }}
      />
    );
  }

  if (!productQuery.data || !id) return null;

  const product = productQuery.data;
  const allLicenses = licensesQuery.data ?? [];
  const productLicenses = allLicenses.filter(
    (l) => l.product_id === product.id,
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link to="/products" className="text-sm text-gray-600 hover:underline">
          ← Back to products
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold">Product</h1>

      <dl className="mb-8 grid max-w-2xl grid-cols-[max-content_1fr] gap-x-6 gap-y-3 text-sm">
        <dt className="font-medium text-gray-500">Name</dt>
        <dd className="text-gray-900">{product.name}</dd>

        <dt className="font-medium text-gray-500">ID</dt>
        <dd className="font-mono text-xs text-gray-900">{product.id}</dd>
      </dl>

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
        ) : productLicenses.length === 0 ? (
          <EmptyState message="No licenses for this product." />
        ) : (
          <DataTable<License>
            rows={productLicenses}
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
                key: 'user',
                header: 'User',
                cell: (l) => usersById.get(l.user_id)?.email ?? l.user_id,
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
