import { ConnectDetails } from '@mdm/server-status'
import { fetchTyped } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

export function useGetProfiles(serverRoot?: string) {
  const queryKey = ['profiles', serverRoot ?? '']
  const url = `${serverRoot}/api/profiles`

  return useQuery({
    enabled: !!serverRoot,
    queryFn: () => fetchTyped<ConnectDetails>(url),
    queryKey,
  })
}
