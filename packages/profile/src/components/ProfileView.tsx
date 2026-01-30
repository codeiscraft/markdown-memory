import { Heading, Stack } from '@chakra-ui/react'
import { CenteredSpinner } from '@mdm/components'
import { SetList } from '@mdm/sets/components'
import { SourceDetailsView } from '@mdm/source'

import { useGetProfile } from '../hooks/useGetProfile'

export function ProfileView({ profileSlug }: { profileSlug: string }) {
  const { data: profile, isPending } = useGetProfile(profileSlug)

  const { name } = profile || {}

  const pending = isPending

  if (pending) {
    return <CenteredSpinner />
  }

  return (
    <Stack>
      <Heading size="sm">{name}</Heading>
      <SourceDetailsView source={profile?.source} sourceDirectory={profile?.sourceDirectory} />
      <SetList defaultOpen={true} profileSlug={profileSlug} />
    </Stack>
  )
}
