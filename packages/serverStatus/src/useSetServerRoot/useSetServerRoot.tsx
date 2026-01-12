import { fetchLocal } from '@mdm/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { serverRootKey } from '../server'
import { ServerConnect } from '../types'

export function useSetServerRoot() {
  const queryClient = useQueryClient()
  const queryKey = ['serverRoot']

  return useMutation({
    mutationFn: async (connect: ServerConnect) =>
      fetchLocal<ServerConnect>(serverRootKey, 'set', connect),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey })
    },
  })
}
