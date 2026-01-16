import { fetchLocal } from '@mdm/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { connectDetailsKey } from '../server'
import { ConnectDetails } from '../types'

export function useSetConnectDetails() {
  const queryClient = useQueryClient()
  const queryKey = ['connectDetails']

  return useMutation({
    mutationFn: async (connect: ConnectDetails) =>
      fetchLocal<ConnectDetails>(connectDetailsKey, 'set', connect),
    mutationKey: ['setConnectDetails'],
    onSuccess: (data) => queryClient.setQueryData(queryKey, data),
  })
}
