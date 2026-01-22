import { fetchLocal } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { connectDetailsQueryKey, connectDetailsStorageKey } from '../server'
import { ConnectDetails } from '../types'

export function useGetConnectDetails(profileName: string) {
  const queryKey = connectDetailsQueryKey(profileName)
  const storageKey = connectDetailsStorageKey(profileName)

  return useQuery({
    initialData: () => fetchLocal<ConnectDetails>(storageKey, 'get'),
    queryFn: () => fetchLocal<ConnectDetails>(storageKey, 'get'),
    queryKey,
  })
}
