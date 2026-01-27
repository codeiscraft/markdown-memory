import { fetchLocal } from '@mdm/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { connectDetailsQueryKey, connectDetailsStorageKey } from '../server'
import { ConnectDetails } from '../types'

export function useSetConnectDetails() {
  const queryClient = useQueryClient()
  const key = connectDetailsQueryKey
  const storageKey = connectDetailsStorageKey

  return useMutation({
    mutationFn: async (connect: ConnectDetails) =>
      fetchLocal<ConnectDetails>(storageKey, 'set', connect),
    mutationKey: key,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ exact: false, queryKey: key })
      queryClient.setQueryData(key, data)
      queryClient.removeQueries({
        exact: false,
        queryKey: ['identity', data?.serverRoot],
      })
    },
  })
}
