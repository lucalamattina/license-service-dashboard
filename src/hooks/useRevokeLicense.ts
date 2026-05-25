import { useMutation, useQueryClient } from '@tanstack/react-query';
import { revokeLicense } from '../api/licenses';
import type { ApiError, License } from '../api/types';

export function useRevokeLicense() {
  const queryClient = useQueryClient();
  return useMutation<License, ApiError, string>({
    mutationFn: revokeLicense,
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: ['licenses'] });
      void queryClient.invalidateQueries({ queryKey: ['license', id] });
    },
    onError: (error, id) => {
      // If the backend rejects because the license is already non-active,
      // the dashboard's cached state is stale — refresh so the badge updates.
      if (error.code === 'license_not_active') {
        void queryClient.invalidateQueries({ queryKey: ['licenses'] });
        void queryClient.invalidateQueries({ queryKey: ['license', id] });
      }
    },
  });
}
