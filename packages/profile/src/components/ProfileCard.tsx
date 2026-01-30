import { Card, Heading, IconButton, Link, Skeleton, Spacer, Stack } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { SetList } from '@mdm/sets/components'
import { SourceDetailsView } from '@mdm/source'

import { useDeleteProfile } from '../hooks/useDeleteProfile'
import { useGetProfile } from '../hooks/useGetProfile'

export interface ProfileCardProps {
  profileId: string
}

export function ProfileCard({ profileId }: ProfileCardProps) {
  const { data: profile, isPending } = useGetProfile(profileId)
  const { isPending: isDeleting, mutate: deleteProfile } = useDeleteProfile(profileId)

  const pending = isPending

  if (pending) {
    return <Skeleton height="100px" />
  }

  const { name, slug, source } = profile!

  if (!slug || !source) {
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
        <SourceDetailsView
          defaultOpen={false}
          source={source}
          sourceDirectory={profile?.sourceDirectory}
        />
        <SetList defaultOpen={false} profileSlug={slug} />
      </Card.Body>
    </Card.Root>
  )
}
