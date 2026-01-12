import { useMutation } from '@tanstack/react-query'

import { serverRootKey } from '../profile'

export function useSetServerRoot() {
  return useMutation({
    mutationFn: async (serverRoot: string) => {
      if (serverRoot) {
        localStorage.setItem(serverRootKey, serverRoot)
      }
      return serverRoot
    },
  })
}
