import { IconButton, Stack } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { CenteredSpinner } from '@mdm/components'

import { useGetProfiles } from '../hooks'
import { ProfileCard } from './ProfileCard'

export interface ProfileListProps {
  createProfile: () => void
}

export function ProfileList({ createProfile }: ProfileListProps) {
  const { data: profiles, isPending } = useGetProfiles()

  if (isPending || !profiles) {
    return <CenteredSpinner />
  }

  return (
    <Stack>
      {profiles?.ids.map((profileId: string) => (
        <ProfileCard key={profileId} profileId={profileId} />
      ))}
      <IconButton aria-label="Add Profile" onClick={createProfile} size="sm" variant="subtle">
        <Icon name="Plus" />
      </IconButton>
    </Stack>
  )
}
