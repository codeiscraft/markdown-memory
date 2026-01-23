import { Field, Input, Stack, Strong, Text } from '@chakra-ui/react'
import { ServerStatus, useGetConnectDetails, useSetConnectDetails } from '@mdm/server-status'
import { useEffect, useState } from 'react'

import { Profile } from '../types'

export interface ServerConnectProps {
  profile?: Profile
}

export function ServerConnect({ profile }: ServerConnectProps) {
  const { data: connectDetails } = useGetConnectDetails(profile?.slug)
  const { mutate: setConnectDetails } = useSetConnectDetails(profile?.slug)
  const [serverRoot, setServerRoot] = useState(connectDetails?.serverRoot || undefined)

  const isValid = serverRoot ? /^https?:\/\/\S+$/.test(serverRoot) : false
  const url = serverRoot ? `${serverRoot}/${profile?.slug}` : undefined

  useEffect(() => {
    if (!isValid || !serverRoot) return

    const timeoutId = setTimeout(() => setConnectDetails({ serverRoot }), 400)

    return () => clearTimeout(timeoutId)
  }, [isValid, serverRoot, setConnectDetails, profile])

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
        <ServerStatus profileSlug={profile?.slug} />
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
