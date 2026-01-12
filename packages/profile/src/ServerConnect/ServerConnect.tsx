import { Field, Input, Stack } from '@chakra-ui/react'
import { ServerStatus, useGetServerRoot, useSetServerRoot } from '@mdm/server-status'
import { ChangeEvent, useState } from 'react'

export interface ServerConnectProps {
  setIsStepValid: (valid: boolean) => void
}

export function ServerConnect({ setIsStepValid }: ServerConnectProps) {
  const { data: serverConnect } = useGetServerRoot()
  const { mutate: setServer } = useSetServerRoot()

  const [serverRoot, setServerRoot] = useState(serverConnect?.serverRoot || '')
  const isValid = /^https?:\/\/\S+$/.test(serverRoot)

  const connectSuccess = (connected: boolean) => {
    if (connected) {
      setIsStepValid(true)
    }
  }

  const update = (event: ChangeEvent<HTMLInputElement>) => {
    setServerRoot(event.target.value)
    if (isValid) {
      setServer({ serverRoot: event.target.value })
    }
    console.log('to invalid')
    setIsStepValid(false)
  }

  return (
    <Stack>
      <Field.Root invalid={!isValid} required>
        <Field.Label>server address</Field.Label>
        <Stack direction="row" gap={1} width="100%">
          <Input
            flex={1}
            onChange={update}
            placeholder="enter the address for your markdown memory server"
            size="sm"
            value={serverRoot}
          />
          <ServerStatus connectSuccess={connectSuccess} />
        </Stack>
      </Field.Root>
    </Stack>
  )
}
