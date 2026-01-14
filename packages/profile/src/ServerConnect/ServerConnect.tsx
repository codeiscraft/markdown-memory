import { Field, Input, Stack } from '@chakra-ui/react'
import { ServerStatus, useGetServerRoot, useSetServerRoot } from '@mdm/server-status'
import { ChangeEvent } from 'react'

export interface ServerConnectProps {
  setIsStepValid: (valid: boolean) => void
}

export function ServerConnect({ setIsStepValid }: ServerConnectProps) {
  const { data: connectDetails } = useGetServerRoot()
  const { mutate: setServer } = useSetServerRoot()

  const isValid = /^https?:\/\/\S+$/.test(connectDetails?.serverRoot || '')

  const connectSuccess = (connected: boolean) => {
    if (connected) {
      setIsStepValid(true)
    }
  }

  const update = (event: ChangeEvent<HTMLInputElement>) => {
    setServer({ serverRoot: event.target.value })
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
            value={connectDetails?.serverRoot || ''}
          />
          <ServerStatus connectSuccess={connectSuccess} />
        </Stack>
      </Field.Root>
    </Stack>
  )
}
