import { Button, Card, Link, Strong } from '@chakra-ui/react'

export function NewProfileCard({ createProfile }: { createProfile: () => void }) {
  return (
    <Card.Root size="sm" variant="subtle">
      <Card.Header display="flex" justifyContent="flex-start" p={0} textAlign="left" w="full">
        <Button
          alignSelf="flex-start"
          as={Link}
          onClick={() => {
            createProfile()
          }}
          size="sm"
          variant="plain"
        >
          <Strong>create a new profile</Strong>
        </Button>
      </Card.Header>
      <Card.Body color="fg.muted" fontSize="sm" pt={0}>
        create a secure connection to a markdown memory server and define which sets of markdown
        notes which will be synced
      </Card.Body>
    </Card.Root>
  )
}
