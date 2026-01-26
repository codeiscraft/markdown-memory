import { Button, Card, Heading, Stack } from '@chakra-ui/react'
import { Icon } from '@mdm/components'

export interface ProfileListProps {
  createProfile: () => void
}

export function ProfileList({ createProfile }: ProfileListProps) {
  return (
    <Stack>
      <Heading size="sm">select profile</Heading>
      <Card.Root size="sm">
        <Card.Header>
          <Heading size="sm">add new profile</Heading>
        </Card.Header>
        <Card.Body color="fg.muted" fontSize="sm">
          create a secure connection to a markdown memory server and define which sets of markdown
          notes which will be synced
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={() => {
              createProfile()
            }}
            size="sm"
            variant="subtle"
          >
            <Icon name="Play" />
            get started
          </Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
