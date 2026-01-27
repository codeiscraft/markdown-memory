import { Field, Input, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useGetConnectDetails } from '../hooks/useGetConnectDetails'
import { useSetConnectDetails } from '../hooks/useSetConnectDetails'
import { ServerStatus } from './ServerStatus'

export function ServerConnect() {
  const { data: connectDetails } = useGetConnectDetails()
  const { mutate: setConnectDetails } = useSetConnectDetails()
  const [serverRoot, setServerRoot] = useState(connectDetails?.serverRoot || '')

  const isValid = serverRoot ? /^https?:\/\/\S+$/.test(serverRoot) : false

  useEffect(() => {
    if (!isValid || !serverRoot) return

    const timeoutId = setTimeout(() => setConnectDetails({ serverRoot }), 400)

    return () => clearTimeout(timeoutId)
  }, [isValid, serverRoot, setConnectDetails])

  return (
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
  )
}
