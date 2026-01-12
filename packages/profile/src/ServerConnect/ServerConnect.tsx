import { Field, Group, IconButton, Input, Stack } from '@chakra-ui/react'
import { useServerIdentity } from '@mdm/application'
import { Check, CircleQuestionMark } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

export interface ServerConnectProps {
  setIsStepValid: (valid: boolean) => void
  setServerRoot: (serverRoot: string) => void
}

export function ServerConnect() {
  const [serverRoot, setServerRoot] = useState('')

  const isValid = serverRoot.length === 0 || /^https?:\/\/\S+$/.test(serverRoot)
  const { isFetching, isSuccess } = useServerIdentity(isValid ? serverRoot : undefined)

  const update = (event: ChangeEvent<HTMLInputElement>) => setServerRoot(event.target.value)

  const serverValid = isValid && isSuccess
  const icon = serverValid ? <Check /> : <CircleQuestionMark />
  const color = serverValid ? 'green.500' : 'gray.500'

  return (
    <Stack>
      <Field.Root invalid={!isValid} required>
        <Field.Label>server address</Field.Label>
        <Group attached w="full">
          <Input
            flex={1}
            onChange={update}
            placeholder="enter the address for your markdown memory server"
            size="sm"
            value={serverRoot}
          />

          <IconButton color={color} loading={isFetching} size="sm" variant="outline">
            {icon}
          </IconButton>
        </Group>
      </Field.Root>
    </Stack>
  )
}
