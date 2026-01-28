import { Button, Card, Field, Heading, Input, Link, Stack, Strong } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useGetConnectDetails } from '../hooks/useGetConnectDetails'
import { useSetConnectDetails } from '../hooks/useSetConnectDetails'
import { ServerStatus } from './ServerStatus'

export interface ServerConnectProps {
  connectSuccess: () => void
}

export function ServerConnect({ connectSuccess }: ServerConnectProps) {
  const { data: connectDetails } = useGetConnectDetails()
  const { mutate: setConnectDetails } = useSetConnectDetails()
  const [serverRoot, setServerRoot] = useState(connectDetails?.serverRoot || '')

  const isValid = !serverRoot || /^https?:\/\/\S+$/.test(serverRoot)

  useEffect(() => {
    if (!isValid || !serverRoot) return

    const timeoutId = setTimeout(() => setConnectDetails({ serverRoot }), 400)

    return () => clearTimeout(timeoutId)
  }, [isValid, serverRoot, setConnectDetails])

  const connectionReady = connectDetails && connectDetails.lastConnected

  return (
    <Stack>
      <Card.Root size="sm" variant="outline">
        <Card.Header>
          <Heading size="sm">connect</Heading>
        </Card.Header>
        <Card.Body color="fg.muted" fontSize="sm">
          <Field.Root invalid={serverRoot !== undefined && !isValid} required>
            <Field.Label>server address</Field.Label>
            <Stack direction="row" gap={1} width="100%">
              <Input
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServerRoot(e.target.value)}
                placeholder="enter the address for your markdown memory server"
                size="sm"
                value={serverRoot}
              />
              <ServerStatus />
            </Stack>
          </Field.Root>
        </Card.Body>
        <Card.Footer>
          <Stack direction="row" justify="center" width="100%">
            <Button
              as={Link}
              disabled={!connectionReady}
              onClick={connectSuccess}
              size="sm"
              variant="plain"
            >
              <Strong>connect</Strong>
            </Button>
          </Stack>
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
