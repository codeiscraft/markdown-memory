import { Heading, Stack } from '@chakra-ui/react'

import { CenteredSpinner } from '../../../components/dist/CenteredSpinner/CenteredSpinner'
import { useGetProfiles } from '../hooks'
import { Source, SourceDirectoryDetails } from '../types'
import { NewProfileCard } from './NewProfileCard'
import { ProfileCard } from './ProfileCard'

export interface ProfileListProps {
  createProfile: () => void
  verifySourceDirectory: (source: Source, path: string) => Promise<SourceDirectoryDetails>
}

export function ProfileList({ createProfile, verifySourceDirectory }: ProfileListProps) {
  const { data: profiles, isPending } = useGetProfiles()

  if (isPending) {
    return <CenteredSpinner />
  }

  return (
    <Stack>
      <Heading size="sm">profiles</Heading>
      {profiles?.ids.map((profileId: string) => (
        <ProfileCard
          key={profileId}
          profileId={profileId}
          verifySourceDirectory={verifySourceDirectory}
        />
      ))}
      <NewProfileCard createProfile={createProfile} />
    </Stack>
  )
}
