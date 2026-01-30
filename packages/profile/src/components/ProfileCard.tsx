import type { Source, SourceDetails } from '@mdm/source/types'

import {
  Box,
  Card,
  Collapsible,
  Heading,
  IconButton,
  Link,
  Skeleton,
  Spacer,
  Stack,
  Strong,
} from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { SourceDetailsView } from '@mdm/source'
import { useEffect, useState } from 'react'

import { useDeleteProfile } from '../hooks/useDeleteProfile'
import { useGetProfile } from '../hooks/useGetProfile'

export interface ProfileCardProps {
  profileId: string
  verifySourceDirectory: (source: Source, path: string) => Promise<SourceDetails>
}

export function ProfileCard({ profileId, verifySourceDirectory }: ProfileCardProps) {
  const { data: profile, isPending } = useGetProfile(profileId)
  const { isPending: isDeleting, mutate: deleteProfile } = useDeleteProfile(profileId)
  const [sourceDetails, setSourceDetails] = useState<null | SourceDetails>(null)

  useEffect(() => {
    const fetchSourceDetails = async () => {
      if (profile && profile.source && profile.sourceDirectory) {
        const details = await verifySourceDirectory(profile.source, profile.sourceDirectory)
        setSourceDetails(details)
      }
    }
    fetchSourceDetails()
  }, [profile, verifySourceDirectory])

  if (isPending) {
    return <Skeleton height="150px" />
  }

  const { name, slug, source } = profile!

  if (!slug || !source || !sourceDetails) {
    return null
  }

  return (
    <Card.Root size="sm" variant="outline">
      <Card.Header pt={1}>
        <Stack align="center" direction="row">
          <Heading size="sm">
            <Link href={`#/profiles/${slug}`}>{name}</Link>
          </Heading>
          <Spacer />
          <IconButton
            aria-label="delete profile"
            loading={isDeleting}
            onClick={() => deleteProfile()}
            size="sm"
            variant="ghost"
          >
            <Icon name="Trash" />
          </IconButton>
        </Stack>
      </Card.Header>
      <Card.Body color="fg.muted" fontSize="sm">
        <Collapsible.Root>
          <Collapsible.Trigger>
            <Stack align="center" cursor="pointer" direction="row">
              <Icon name="FolderCheck" size="sm" />
              <Strong textStyle="sm">source details</Strong>
            </Stack>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box borderRadius="md" borderWidth="1px" color="fg.muted" mt="2" p="4">
              <SourceDetailsView source={source} sourceDetails={sourceDetails} />
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card.Body>
    </Card.Root>
  )
}
