import { useGetConnectDetails } from '@mdm/server-connect'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiUrl, profileKey } from './util'

export function useDeleteProfile(profileSlug?: string) {
  const queryClient = useQueryClient()
  const { data: connectDetails } = useGetConnectDetails()
  const { serverRoot } = connectDetails || {}
  const mutationKey = profileKey(serverRoot, profileSlug)
  const url = apiUrl(serverRoot!, profileSlug)

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(url, { method: 'DELETE' })
      if (!res.ok) {
        throw new Error(`DELETE ${url} failed: ${res.status} ${res.statusText}`)
      }
    },
    mutationKey,
    onSuccess: async () => {
      const clearProfile = profileKey(serverRoot, profileSlug)
      const clearProfiles = profileKey(serverRoot)
      await queryClient.invalidateQueries({ queryKey: clearProfile })
      await queryClient.invalidateQueries({ queryKey: clearProfiles })
    },
  })
}
