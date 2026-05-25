import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useLicenses } from '../hooks/useLicenses';
import { DataTable } from '../components/DataTable';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

export default function Products() {
  const navigate = useNavigate();
  const productsQuery = useProducts();
  const licensesQuery = useLicenses();

  if (productsQuery.isLoading || licensesQuery.isLoading) {
    return <LoadingState />;
  }

  if (productsQuery.isError) {
    return (
      <ErrorState
        error={productsQuery.error}
        onRetry={() => {
          void productsQuery.refetch();
        }}
      />
    );
  }

  if (licensesQuery.isError) {
    return (
      <ErrorState
        error={licensesQuery.error}
        onRetry={() => {
          void licensesQuery.refetch();
        }}
      />
    );
  }

  if (!productsQuery.data) return null;

  const licenses = licensesQuery.data ?? [];
  const rows = productsQuery.data.map((product) => ({
    ...product,
    activeLicenseCount: licenses.filter(
      (l) => l.product_id === product.id && l.status === 'active',
    ).length,
  }));

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>

      {rows.length === 0 ? (
        <EmptyState message="No products found." />
      ) : (
        <DataTable
          rows={rows}
          rowKey={(r) => r.id}
          onRowClick={(r) => navigate(`/products/${r.id}`)}
          columns={[
            { key: 'name', header: 'Name', cell: (r) => r.name },
            {
              key: 'active',
              header: 'Active licenses',
              cell: (r) => r.activeLicenseCount,
            },
          ]}
        />
      )}
    </div>
  );
}
