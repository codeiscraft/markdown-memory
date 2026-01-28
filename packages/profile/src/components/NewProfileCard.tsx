import { Button, Card, Heading, Link, Stack, Strong } from '@chakra-ui/react'

export function NewProfileCard({ createProfile }: { createProfile: () => void }) {
  return (
    <Card.Root size="sm" variant="subtle">
      <Card.Header>
        <Heading size="sm">add new profile</Heading>
      </Card.Header>
      <Card.Body color="fg.muted" fontSize="sm">
        create a secure connection to a markdown memory server and define which sets of markdown
        notes which will be synced
      </Card.Body>
      <Card.Footer>
        <Stack direction="row" justify="flex-end" width="100%">
          <Button
            as={Link}
            onClick={() => {
              createProfile()
            }}
            size="sm"
            variant="plain"
          >
            <Strong>get started</Strong>
          </Button>
        </Stack>
      </Card.Footer>
    </Card.Root>
  )
}
