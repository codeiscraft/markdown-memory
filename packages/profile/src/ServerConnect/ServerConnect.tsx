import {
  Em,
  Field,
  Group,
  HoverCard,
  IconButton,
  Input,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
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
  const {
    data: identity,
    isFetching,
    isSuccess,
  } = useServerIdentity(isValid ? serverRoot : undefined)

  const update = (event: ChangeEvent<HTMLInputElement>) => setServerRoot(event.target.value)

  const serverValid = isValid && isSuccess
  const icon = serverValid ? <Check /> : <CircleQuestionMark />
  const color = serverValid ? 'green.500' : 'gray.500'
  const serverDetails =
    serverValid && identity ? (
      <Stack>
        <Em>{serverRoot}</Em>
        <Text>
          {identity.product} v{identity.version}
        </Text>
      </Stack>
    ) : (
      'please enter a valid markdown memory server address'
    )

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
          <HoverCard.Root size="sm">
            <HoverCard.Trigger asChild>
              <IconButton color={color} loading={isFetching} size="sm" variant="outline">
                {icon}
              </IconButton>
            </HoverCard.Trigger>
            <Portal>
              <HoverCard.Positioner>
                <HoverCard.Content>
                  <HoverCard.Arrow />
                  {serverDetails}
                </HoverCard.Content>
              </HoverCard.Positioner>
            </Portal>
          </HoverCard.Root>
        </Group>
      </Field.Root>
    </Stack>
  )
}
