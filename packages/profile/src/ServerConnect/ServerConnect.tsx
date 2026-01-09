import { Field, Input, Stack } from '@chakra-ui/react'
import { useServerIdentity } from '@mdm/application'
import { ChangeEvent, useState } from 'react'
export interface ServerConnectProps {
  setIsStepValid: (valid: boolean) => void
  setServerRoot: (serverRoot: string) => void
}

export function ServerConnect() {
  const [serverRoot, setServerRoot] = useState('')
  const { data, isPending } = useServerIdentity(serverRoot)
  console.log(isPending, data)

  const update = (event: ChangeEvent<HTMLInputElement>) => {
    setServerRoot(event.target.value)
  }

  const isValid = serverRoot.length === 0 || /^https?:\/\/\S+$/.test(serverRoot)

  return (
    <Stack>
      <Field.Root invalid={!isValid} required>
        <Field.Label>
          server address <Field.RequiredIndicator />
        </Field.Label>
        <Input
          onChange={update}
          placeholder="enter the address for your markdown memory server"
          value={serverRoot}
        />
      </Field.Root>
    </Stack>
  )
}
