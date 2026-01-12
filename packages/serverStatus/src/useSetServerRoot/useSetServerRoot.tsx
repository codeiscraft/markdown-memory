import { fetchLocal } from '@mdm/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { serverRootKey } from '../server'
import { ConnectDetails } from '../types'

export function useSetServerRoot() {
  const queryClient = useQueryClient()
  const queryKey = ['serverRoot']

  return useMutation({
    mutationFn: async (connect: ConnectDetails) =>
      fetchLocal<ConnectDetails>(serverRootKey, 'set', connect),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey })
    },
  })
}
