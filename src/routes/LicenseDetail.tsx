import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLicense } from '../hooks/useLicense';
import { useUser } from '../hooks/useUser';
import { useProduct } from '../hooks/useProduct';
import { StatusBadge } from '../components/StatusBadge';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { RevokeLicenseModal } from '../components/RevokeLicenseModal';
import { formatDate } from '../lib/format';

export default function LicenseDetail() {
  const { id } = useParams<{ id: string }>();
  const [revokeOpen, setRevokeOpen] = useState(false);

  const licenseQuery = useLicense(id);
  const userQuery = useUser(licenseQuery.data?.user_id);
  const productQuery = useProduct(licenseQuery.data?.product_id);

  if (licenseQuery.isLoading) {
    return <LoadingState />;
  }

  if (licenseQuery.isError) {
    return (
      <ErrorState
        error={licenseQuery.error}
        onRetry={() => {
          void licenseQuery.refetch();
        }}
      />
    );
  }

  if (!licenseQuery.data) return null;

  const license = licenseQuery.data;
  const isRevocable = license.status === 'active';

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          to="/licenses"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to licenses
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-semibold">License</h1>
        <StatusBadge status={license.status} />
      </div>

      <dl className="grid max-w-2xl grid-cols-[max-content_1fr] gap-x-6 gap-y-3 text-sm">
        <dt className="font-medium text-gray-500">ID</dt>
        <dd className="font-mono text-xs text-gray-900">{license.id}</dd>

        <dt className="font-medium text-gray-500">User</dt>
        <dd>
          {userQuery.isLoading ? (
            <span className="text-gray-400">loading…</span>
          ) : userQuery.data ? (
            <Link
              to={`/users/${license.user_id}`}
              className="text-blue-600 hover:underline"
            >
              {userQuery.data.email}
            </Link>
          ) : (
            <span className="font-mono text-xs text-gray-500">
              {license.user_id}
            </span>
          )}
        </dd>

        <dt className="font-medium text-gray-500">Product</dt>
        <dd>
          {productQuery.isLoading ? (
            <span className="text-gray-400">loading…</span>
          ) : productQuery.data ? (
            <Link
              to={`/products/${license.product_id}`}
              className="text-blue-600 hover:underline"
            >
              {productQuery.data.name}
            </Link>
          ) : (
            <span className="font-mono text-xs text-gray-500">
              {license.product_id}
            </span>
          )}
        </dd>

        <dt className="font-medium text-gray-500">Created</dt>
        <dd className="text-gray-900">{formatDate(license.created_at)}</dd>

        <dt className="font-medium text-gray-500">Expires</dt>
        <dd className="text-gray-900">{formatDate(license.expires_at)}</dd>
      </dl>

      <div className="mt-8">
        <button
          type="button"
          disabled={!isRevocable}
          onClick={() => setRevokeOpen(true)}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          Revoke license
        </button>
        {!isRevocable && (
          <p className="mt-2 text-xs text-gray-500">
            Only active licenses can be revoked. This license is {license.status}.
          </p>
        )}
      </div>

      <RevokeLicenseModal
        license={license}
        user={userQuery.data}
        product={productQuery.data}
        open={revokeOpen}
        onOpenChange={setRevokeOpen}
      />
    </div>
  );
}
