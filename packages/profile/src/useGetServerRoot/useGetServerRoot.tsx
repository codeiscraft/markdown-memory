import { useQuery } from '@tanstack/react-query'

import { serverRootKey } from '../profile'

export function useGetServerRoot() {
  const queryKey = ['serverRoot']
  return useQuery({
    initialData: () => {
      return localStorage.getItem(serverRootKey)
    },
    queryFn: async () => {
      return localStorage.getItem(serverRootKey)
    },
    queryKey,
  })
}
