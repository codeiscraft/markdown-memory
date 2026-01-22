import { Field, Input, Stack, Strong, Text } from '@chakra-ui/react'
import { ServerStatus, useGetConnectDetails, useSetConnectDetails } from '@mdm/server-status'
import { useEffect, useState } from 'react'

export interface ServerConnectProps {
  profileName: string
}

export function ServerConnect({ profileName }: ServerConnectProps) {
  const { data: connectDetails } = useGetConnectDetails(profileName)
  const { mutate: setServer } = useSetConnectDetails(profileName)
  const [serverRoot, setServerRoot] = useState(connectDetails?.serverRoot || undefined)

  const isValid = serverRoot ? /^https?:\/\/\S+$/.test(serverRoot) : false
  const url = serverRoot ? `${serverRoot}/${profileName}` : undefined

  useEffect(() => {
    if (!isValid || !serverRoot) return

    const timeoutId = setTimeout(() => setServer({ profileName, serverRoot }), 400)

    return () => clearTimeout(timeoutId)
  }, [isValid, serverRoot, setServer, profileName])

  return (
    <Field.Root invalid={serverRoot !== undefined && !isValid} required>
      <Field.Label>server address</Field.Label>
      <Stack direction="row" gap={1} width="100%">
        <Input
          autoFocus
          flex={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServerRoot(e.target.value)}
          placeholder="enter the address for your markdown memory server"
          size="sm"
          value={serverRoot}
        />
        <ServerStatus profileName={profileName} />
      </Stack>
      <Field.HelperText>
        {url && (
          <Stack direction="row">
            <Text>the url for this profile will be</Text>
            <Strong>{url}</Strong>
          </Stack>
        )}
      </Field.HelperText>
    </Field.Root>
  )
}
