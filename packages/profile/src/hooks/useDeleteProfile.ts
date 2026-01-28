import { useGetConnectDetails } from '@mdm/server-connect'
import { QueryClient, useMutation } from '@tanstack/react-query'

import { apiUrl, profileKey } from './util'

export function useDeleteProfile(profileSlug?: string) {
  const queryClient = new QueryClient()
  const { data: connectDetails } = useGetConnectDetails()
  const { serverRoot } = connectDetails || {}
  const mutationKey = profileKey(serverRoot, profileSlug)
  const url = apiUrl(serverRoot!, profileSlug)

  return useMutation({
    mutationFn: async () => await fetch(url, { method: 'DELETE' }),
    mutationKey,
    onSuccess: async () => {
      console.log('Invalidating profile queries')
      const clearKey = profileKey(serverRoot)
      await queryClient.invalidateQueries({ exact: false, queryKey: clearKey })
    },
  })
}
