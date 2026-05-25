import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLicenses } from '../hooks/useLicenses';
import { useUsersById } from '../hooks/useUsersById';
import { useProductsById } from '../hooks/useProductsById';
import { joinLicenses } from '../lib/joinLicenses';
import { formatDate, truncateId } from '../lib/format';
import { StatusBadge } from '../components/StatusBadge';
import { DataTable } from '../components/DataTable';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import type { LicenseStatus } from '../api/types';

type StatusFilter = LicenseStatus | 'all';
const STATUSES: StatusFilter[] = ['all', 'active', 'expired', 'revoked'];

function isStatusFilter(value: string | null): value is StatusFilter {
  return value !== null && (STATUSES as string[]).includes(value);
}

export default function Licenses() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('status');
  const statusFilter: StatusFilter = isStatusFilter(raw) ? raw : 'all';

  const licensesQuery = useLicenses();
  const { byId: usersById, isError: usersError } = useUsersById();
  const { byId: productsById, isError: productsError } = useProductsById();

  const setStatus = (next: StatusFilter) => {
    if (next === 'all') {
      const params = new URLSearchParams(searchParams);
      params.delete('status');
      setSearchParams(params);
    } else {
      setSearchParams({ status: next });
    }
  };

  if (licensesQuery.isLoading) {
    return <LoadingState />;
  }

  if (licensesQuery.isError || usersError || productsError) {
    return (
      <ErrorState
        error={licensesQuery.error}
        onRetry={() => {
          void licensesQuery.refetch();
        }}
      />
    );
  }

  if (!licensesQuery.data) return null;

  const allRows = joinLicenses(licensesQuery.data, usersById, productsById);
  const rows =
    statusFilter === 'all'
      ? allRows
      : allRows.filter((r) => r.status === statusFilter);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-semibold">Licenses</h1>

      <div
        role="tablist"
        aria-label="Filter by status"
        className="mb-4 inline-flex gap-1 rounded-md bg-gray-100 p-1"
      >
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={statusFilter === s}
            onClick={() => setStatus(s)}
            className={`rounded px-3 py-1 text-sm font-medium capitalize transition-colors ${
              statusFilter === s
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <EmptyState
          message={
            statusFilter === 'all'
              ? 'No licenses found.'
              : `No licenses with status "${statusFilter}".`
          }
        />
      ) : (
        <DataTable
          rows={rows}
          rowKey={(r) => r.id}
          onRowClick={(r) => navigate(`/licenses/${r.id}`)}
          columns={[
            {
              key: 'status',
              header: 'Status',
              cell: (r) => <StatusBadge status={r.status} />,
            },
            {
              key: 'id',
              header: 'License',
              cell: (r) => (
                <span className="font-mono text-xs text-gray-700">
                  …{truncateId(r.id)}
                </span>
              ),
            },
            { key: 'user', header: 'User', cell: (r) => r.user_email },
            { key: 'product', header: 'Product', cell: (r) => r.product_name },
            {
              key: 'expires',
              header: 'Expires',
              cell: (r) => formatDate(r.expires_at),
            },
            {
              key: 'created',
              header: 'Created',
              cell: (r) => formatDate(r.created_at),
            },
          ]}
        />
      )}
    </div>
  );
}
