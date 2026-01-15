import { fetchLocal } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { serverRootKey } from '../server'
import { ConnectDetails } from '../types'

export function useGetServerRoot() {
  const queryKey = ['serverRoot']
  return useQuery({
    initialData: () => fetchLocal<ConnectDetails>(serverRootKey, 'get'),
    queryFn: async () => fetchLocal<ConnectDetails>(serverRootKey, 'get'),
    queryKey,
  })
}
