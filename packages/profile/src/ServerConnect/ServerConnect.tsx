import { Field, Input, Stack } from '@chakra-ui/react'
import { ServerStatus, useGetServerRoot, useSetServerRoot } from '@mdm/server-status'
import { useEffect, useState } from 'react'

export function ServerConnect() {
  const { data: connectDetails } = useGetServerRoot()
  const { mutate: setServer } = useSetServerRoot()
  const [serverRoot, setServerRoot] = useState(connectDetails?.serverRoot || '')

  const isValid = /^https?:\/\/\S+$/.test(serverRoot)

  useEffect(() => {
    if (!isValid) return

    const timeoutId = setTimeout(() => {
      setServer({ serverRoot })
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [isValid, serverRoot, setServer])

  return (
    <Field.Root invalid={serverRoot !== '' && !isValid} required>
      <Field.Label>server address</Field.Label>
      <Stack direction="row" gap={1} width="100%">
        <Input
          flex={1}
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
