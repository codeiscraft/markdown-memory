import { fetchLocal } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { serverRootKey } from '../profile'

export function useGetServerRoot() {
  const queryKey = ['serverRoot']
  return useQuery({
    queryFn: async () => fetchLocal<string>(serverRootKey, 'get'),
    queryKey,
  })
}
