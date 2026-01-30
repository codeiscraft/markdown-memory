import { Heading, Stack } from '@chakra-ui/react'
import { CenteredSpinner } from '@mdm/components'
import { SourceDetailsView, useSourceDetails } from '@mdm/source'

import { useGetProfile } from '../hooks/useGetProfile'

export function ProfileView({ profileSlug }: { profileSlug: string }) {
  const { data: profile, isPending } = useGetProfile(profileSlug)
  const { data: sourceDetails, isPending: sourceDetailsPending } = useSourceDetails(
    profile?.source,
    profile?.sourceDirectory,
  )
  const { name } = profile || {}

  const pending = isPending || sourceDetailsPending

  if (pending) {
    return <CenteredSpinner />
  }

  return (
    <Stack>
      <Heading size="sm">{name}</Heading>
      <SourceDetailsView source={profile?.source} sourceDetails={sourceDetails} />
    </Stack>
  )
}
