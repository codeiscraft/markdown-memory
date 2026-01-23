import { fetchTyped } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { ConnectDetails } from '../types'

export interface ServerIdentity {
  apiVersion: string
  commit: string
  product: string
  version: string
}

export function useServerIdentity(profileSlug?: string, connect?: ConnectDetails | null) {
  const url = `${connect?.serverRoot}/api/identity`
  const isValid = /^https?:\/\/\S+$/.test(connect?.serverRoot || '')
  const enabled = isValid && Boolean(profileSlug && connect?.serverRoot)
  const queryKey = ['identity', profileSlug, connect?.serverRoot]
  return useQuery({
    enabled,
    queryFn: async () => fetchTyped<ServerIdentity>(url),
    queryKey,
  })
}
