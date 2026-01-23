import { fetchLocal } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { connectDetailsQueryKey, connectDetailsStorageKey } from '../server'
import { ConnectDetails } from '../types'

export function useGetConnectDetails(profileSlug?: string) {
  const queryKey = connectDetailsQueryKey(profileSlug ?? '')
  const storageKey = connectDetailsStorageKey(profileSlug ?? '')

  return useQuery({
    enabled: !!profileSlug,
    initialData: () => fetchLocal<ConnectDetails>(storageKey, 'get'),
    queryFn: () => fetchLocal<ConnectDetails>(storageKey, 'get'),
    queryKey,
  })
}
