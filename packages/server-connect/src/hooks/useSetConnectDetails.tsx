import { fetchLocal } from '@mdm/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ConnectDetails } from '../types'

export function useSetConnectDetails() {
  const queryClient = useQueryClient()
  const key = ['connectDetails']
  const storageKey = 'mdm.connectDetails'

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
