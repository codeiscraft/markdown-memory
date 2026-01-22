import { fetchLocal } from '@mdm/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { connectDetailsQueryKey, connectDetailsStorageKey } from '../server'
import { ConnectDetails } from '../types'

export function useSetConnectDetails(profileName: string) {
  const queryClient = useQueryClient()
  const queryKey = connectDetailsQueryKey(profileName)
  const storageKey = connectDetailsStorageKey(profileName)

  return useMutation({
    mutationFn: async (connect: ConnectDetails) =>
      fetchLocal<ConnectDetails>(storageKey, 'set', connect),
    mutationKey: ['setConnectDetails', profileName],
    onSuccess: (data) => {
      console.log('clearing connect details cache', { data, profileName })
      queryClient.invalidateQueries({ exact: false, queryKey })
      queryClient.setQueryData(queryKey, data)
      console.log('clearing identity cache', ['identity', profileName])
      queryClient.removeQueries({
        exact: false,
        queryKey: ['identity', profileName],
      })
    },
  })
}
