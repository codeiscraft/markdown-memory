import { useGetConnectDetails } from '@mdm/server-connect'
import { fetchTyped } from '@mdm/utils'
import { useQuery } from '@tanstack/react-query'

import { Profile } from '../types'
import { apiUrl, profileKey } from './util'

interface ProfileResponse {
  key: string
  value: string
}

export function useGetProfile(profileId?: string) {
  const { data: connectDetails } = useGetConnectDetails()
  const { serverRoot } = connectDetails || {}
  const queryKey = profileKey(serverRoot, profileId)
  const url = apiUrl(serverRoot!, profileId)

  return useQuery({
    enabled: !!serverRoot && !!profileId,
    queryFn: async () => {
      const response = await fetchTyped<ProfileResponse>(url)
      const profile = JSON.parse(response.value) as Profile
      return profile
    },
    queryKey,
  })
}
