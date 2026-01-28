import { putTyped } from '@mdm/utils'
import { useMutation } from '@tanstack/react-query'

import { Profile } from '../types'

export interface ProfilePutBody {
  profile: string
  ttlSeconds?: number
}

export interface ProfilePutResponse {
  profile: string
  ttlSeconds?: number
}

export function usePutProfile(profileSlug?: string, serverRoot?: string) {
  const mutationKey = ['profile', profileSlug ?? '']
  const url = `${serverRoot}/api/profiles/${profileSlug}`

  return useMutation({
    mutationFn: async (profile: Profile) =>
      await putTyped<ProfilePutBody, ProfilePutResponse>(url, {
        profile: JSON.stringify(profile),
      }),
    mutationKey,
  })
}
