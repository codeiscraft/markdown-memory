import { fetchTyped } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { ConnectDetails } from '../types'

export interface ServerIdentity {
  apiVersion: string
  commit: string
  product: string
  version: string
}

export function useServerIdentity(connect?: ConnectDetails | null) {
  const url = `${connect?.serverRoot}/api/identity`
  const isValid = /^https?:\/\/\S+$/.test(connect?.serverRoot || '')
  const enabled = isValid && Boolean(connect?.serverRoot)
  const queryKey = ['identity', connect?.serverRoot]
  return useQuery({
    enabled,
    queryFn: async () => fetchTyped<ServerIdentity>(url),
    queryKey,
  })
}
