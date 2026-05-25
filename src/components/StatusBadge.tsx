import type { LicenseStatus } from '../api/types';

const STYLES: Record<LicenseStatus, string> = {
  active: 'bg-green-100 text-green-800 ring-green-600/20',
  expired: 'bg-gray-100 text-gray-700 ring-gray-500/20',
  revoked: 'bg-red-100 text-red-800 ring-red-600/20',
};

interface Props {
  status: LicenseStatus;
}

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
