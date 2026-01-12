import { fetchLocal } from '@mdm/utils'
import { useMutation } from '@tanstack/react-query'

import { serverRootKey } from '../profile'

export function useSetServerRoot() {
  return useMutation({
    mutationFn: async (serverRoot: string) => fetchLocal(serverRootKey, 'set', serverRoot),
  })
}
