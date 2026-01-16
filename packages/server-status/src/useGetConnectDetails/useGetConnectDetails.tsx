import { fetchLocal } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { connectDetailsKey } from '../server'
import { ConnectDetails } from '../types'

export function useGetConnectDetails() {
  const queryKey = ['connectDetails']
  return useQuery({
    initialData: () => fetchLocal<ConnectDetails>(connectDetailsKey, 'get'),
    queryFn: () => fetchLocal<ConnectDetails>(connectDetailsKey, 'get'),
    queryKey,
  })
}
