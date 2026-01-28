import { useGetConnectDetails } from '@mdm/server-connect'
import { fetchTyped } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { apiUrl, profileKey } from './util'

export interface ProfilesResponse {
  ids: string[]
}

export function useGetProfiles() {
  const { data: connectDetails } = useGetConnectDetails()
  const serverRoot = connectDetails?.serverRoot
  const queryKey = profileKey(serverRoot)
  const url = apiUrl(serverRoot!)

  return useQuery({
    enabled: !!serverRoot,
    queryFn: () => fetchTyped<ProfilesResponse>(url),
    queryKey,
  })
}
