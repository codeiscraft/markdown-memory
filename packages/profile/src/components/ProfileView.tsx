import { Box, Heading } from '@chakra-ui/react'
import { CenteredSpinner } from '@mdm/components'

import { useGetProfile } from '../hooks/useGetProfile'

export function ProfileView({ profileSlug }: { profileSlug: string }) {
  const { data: profile, isPending } = useGetProfile(profileSlug)
  const { name, slug } = profile || {}

  if (isPending || !profile) {
    return <CenteredSpinner />
  }

  return (
    <Box flex="1" p={4}>
      <Heading mb={4} size="md">
        {name} ({slug})
      </Heading>
      {/* Profile details would go here */}
    </Box>
  )
}
