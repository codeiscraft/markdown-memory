import { fetchLocal } from '@mdm/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { connectDetailsQueryKey, connectDetailsStorageKey } from '../server'
import { ConnectDetails } from '../types'

export function useSetConnectDetails(profileSlug?: string) {
  const queryClient = useQueryClient()
  const queryKey = connectDetailsQueryKey(profileSlug ?? '')
  const storageKey = connectDetailsStorageKey(profileSlug ?? '')

  return useMutation({
    mutationFn: async (connect: ConnectDetails) =>
      fetchLocal<ConnectDetails>(storageKey, 'set', connect),
    mutationKey: ['setConnectDetails', profileSlug],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ exact: false, queryKey })
      queryClient.setQueryData(queryKey, data)
      queryClient.removeQueries({
        exact: false,
        queryKey: ['identity', profileSlug],
      })
    },
  })
}
