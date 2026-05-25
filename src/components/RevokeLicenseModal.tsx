import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from './Dialog';
import { useRevokeLicense } from '../hooks/useRevokeLicense';
import type { License, Product, User } from '../api/types';

interface Props {
  license: License;
  user: User | undefined;
  product: Product | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RevokeLicenseModal({
  license,
  user,
  product,
  open,
  onOpenChange,
}: Props) {
  const revokeMutation = useRevokeLicense();

  const handleRevoke = () => {
    revokeMutation.mutate(license.id, {
      onSuccess: () => {
        onOpenChange(false);
        revokeMutation.reset();
        toast.success('License revoked');
      },
      onError: (error) => {
        if (error.code === 'license_not_active') {
          onOpenChange(false);
          revokeMutation.reset();
          toast.error(error.message);
        }
        // Other errors (network, 5xx): keep modal open with inline error
      },
    });
  };

  const handleOpenChange = (next: boolean) => {
    if (revokeMutation.isPending) return; // prevent close mid-request
    if (!next) {
      revokeMutation.reset();
    }
    onOpenChange(next);
  };

  const isOtherError =
    revokeMutation.isError &&
    revokeMutation.error.code !== 'license_not_active';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTitle>Revoke license</DialogTitle>
      <DialogDescription>
        Revoke license{' '}
        <span className="font-mono text-xs text-gray-800">{license.id}</span>{' '}
        for{' '}
        <span className="font-medium text-gray-900">
          {user?.email ?? license.user_id}
        </span>{' '}
        on{' '}
        <span className="font-medium text-gray-900">
          {product?.name ?? license.product_id}
        </span>
        ? This cannot be undone.
      </DialogDescription>

      {isOtherError && (
        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {revokeMutation.error.message}
        </p>
      )}

      <DialogFooter>
        <DialogClose asChild>
          <button
            type="button"
            disabled={revokeMutation.isPending}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </DialogClose>
        <button
          type="button"
          onClick={handleRevoke}
          disabled={revokeMutation.isPending}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {revokeMutation.isPending ? 'Revoking…' : 'Revoke license'}
        </button>
      </DialogFooter>
    </Dialog>
  );
}
