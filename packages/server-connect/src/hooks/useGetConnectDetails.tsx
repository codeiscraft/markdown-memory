import { fetchLocal } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { ConnectDetails } from '../types'

export function useGetConnectDetails() {
  const queryKey = ['connectDetails']
  const storageKey = 'mdm.connectDetails'

  return useQuery({
    initialData: () => fetchLocal<ConnectDetails>(storageKey, 'get'),
    queryFn: () => fetchLocal<ConnectDetails>(storageKey, 'get'),
    queryKey,
  })
}
