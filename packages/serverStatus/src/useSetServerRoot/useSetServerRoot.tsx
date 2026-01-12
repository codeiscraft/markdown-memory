import { fetchLocal } from '@mdm/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { serverRootKey } from '../server'

export function useSetServerRoot() {
  const queryClient = useQueryClient()
  const queryKey = ['serverRoot']

  return useMutation({
    mutationFn: async (serverRoot: string) => fetchLocal(serverRootKey, 'set', serverRoot),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey })
    },
  })
}
