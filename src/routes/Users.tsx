import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { useLicenses } from '../hooks/useLicenses';
import { DataTable } from '../components/DataTable';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

export default function Users() {
  const navigate = useNavigate();
  const usersQuery = useUsers();
  const licensesQuery = useLicenses();

  if (usersQuery.isLoading || licensesQuery.isLoading) {
    return <LoadingState />;
  }

  if (usersQuery.isError) {
    return (
      <ErrorState
        error={usersQuery.error}
        onRetry={() => {
          void usersQuery.refetch();
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

  if (!usersQuery.data) return null;

  const licenses = licensesQuery.data ?? [];
  const rows = usersQuery.data.map((user) => ({
    ...user,
    activeLicenseCount: licenses.filter(
      (l) => l.user_id === user.id && l.status === 'active',
    ).length,
  }));

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>

      {rows.length === 0 ? (
        <EmptyState message="No users found." />
      ) : (
        <DataTable
          rows={rows}
          rowKey={(r) => r.id}
          onRowClick={(r) => navigate(`/users/${r.id}`)}
          columns={[
            { key: 'email', header: 'Email', cell: (r) => r.email },
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
