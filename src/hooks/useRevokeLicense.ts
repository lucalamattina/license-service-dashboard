import { useMutation, useQueryClient } from '@tanstack/react-query';
import { revokeLicense } from '../api/licenses';
import type { License, ApiError } from '../api/types';

export function useRevokeLicense() {
  const queryClient = useQueryClient();
  return useMutation<License, ApiError, string>({
    mutationFn: revokeLicense,
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: ['licenses'] });
      void queryClient.invalidateQueries({ queryKey: ['license', id] });
    },
  });
}
