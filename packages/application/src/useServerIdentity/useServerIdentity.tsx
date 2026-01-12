import { fetchTyped } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

export interface ServerIdentity {
  apiVersion: string
  commit: string
  product: string
  version: string
}

export function useServerIdentity(serverRoot?: string) {
  const url = `${serverRoot}/api/identity`
  const queryKey = ['identity', serverRoot]
  return useQuery({
    enabled: !!serverRoot,
    queryFn: async () => fetchTyped<ServerIdentity>(url),
    queryKey,
  })
}
